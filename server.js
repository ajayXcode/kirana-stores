require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('node:path');
const { db, initSchema, seedData, getCustomersWithBalance, getCustomerById } = require('./db');
const { parseHinglishEntry } = require('./parser');

const app = express();
const PORT = process.env.PORT || 3000;
const SHOP_NAME = process.env.SHOP_NAME || 'Ramesh Kirana Store';

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'udhar-buddy-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));

// Serve landing.html at root for non-authenticated visitors (before static middleware)
app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Serve static files (login.html, style.css, app.js always accessible without auth)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html (dashboard) for authenticated users at /dashboard
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login.html');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- AUTH ROUTES ---

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ error: 'Phone and password are required.' });
  }
  const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone.trim());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Wrong phone number or password. Please try again.' });
  }
  req.session.userId = user.id;
  req.session.shopName = user.shop_name;
  return res.json({ success: true, user: { id: user.id, owner_name: user.owner_name, shop_name: user.shop_name } });
});

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { shop_name, owner_name, phone, password } = req.body;
  if (!shop_name || !owner_name || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters.' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE phone = ?').get(phone.trim());
  if (existing) {
    return res.status(409).json({ error: 'This phone number is already registered. Please login instead.' });
  }
  const result = db.prepare(
    'INSERT INTO users (shop_name, owner_name, phone, password) VALUES (?, ?, ?, ?)'
  ).run(shop_name.trim(), owner_name.trim(), phone.trim(), password);

  req.session.userId = result.lastInsertRowid;
  req.session.shopName = shop_name.trim();
  return res.json({ success: true, user: { id: result.lastInsertRowid, owner_name: owner_name.trim(), shop_name: shop_name.trim() } });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// GET /api/auth/me — check session
app.get('/api/auth/me', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ loggedIn: false });
  const user = db.prepare('SELECT id, owner_name, shop_name FROM users WHERE id = ?').get(req.session.userId);
  return res.json({ loggedIn: true, user });
});

// Initialize SQLite Schema & Seed Data
initSchema();

// 1. Parse Voice/Text Input
app.post('/api/parse', (req, res) => {
  const { text, last_customer_id } = req.body;
  const customers = getCustomersWithBalance();
  const parsed = parseHinglishEntry(text, customers, last_customer_id ? Number(last_customer_id) : null);
  return res.json(parsed);
});

// 2. Get Customers with derived balances
app.get('/api/customers', (req, res) => {
  const customers = getCustomersWithBalance();
  return res.json({ customers });
});

// 2b. Add New Customer
app.post('/api/customers', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Customer name is required' });
  }

  const phoneNum = phone && phone.trim() ? phone.trim() : '+9198765' + Math.floor(10000 + Math.random() * 90000);
  const stmt = db.prepare("INSERT INTO customers (name, phone, consent, opted_out, disputed) VALUES (?, ?, 1, 0, 0)");
  const result = stmt.run(name.trim(), phoneNum);

  const newCust = getCustomerById(Number(result.lastInsertRowid));
  return res.json({ success: true, customer: newCust });
});

// 2c. Cancel / Void an Entry (Immutable correction)
app.post('/api/entries/:id/void', (req, res) => {
  const { id } = req.params;
  const entry = db.prepare('SELECT * FROM ledger_entries WHERE id = ?').get(id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });

  db.prepare('UPDATE ledger_entries SET is_voided = 1 WHERE id = ?').run(id);
  const updatedCust = getCustomerById(entry.customer_id);
  return res.json({ success: true, customer: updatedCust, message: 'Entry cancelled successfully.' });
});

// 3. Save Ledger Entry (Immutable Ledger)
app.post('/api/entries', (req, res) => {
  const { customer_id, type, amount, item, qty, raw_text } = req.body;

  if (!customer_id || !type || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Valid customer_id, type, and amount are required.' });
  }

  const customer = getCustomerById(customer_id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found.' });
  }

  const stmt = db.prepare(`
    INSERT INTO ledger_entries (customer_id, type, amount, item, qty, raw_text, is_voided)
    VALUES (?, ?, ?, ?, ?, ?, 0)
  `);
  const result = stmt.run(customer_id, type, Number(amount), item || null, qty || null, raw_text || null);

  const updatedCustomer = getCustomerById(customer_id);

  return res.json({
    success: true,
    entry_id: Number(result.lastInsertRowid),
    customer: updatedCustomer,
    message: `${customer.name} ka ₹${amount} ka ${type === 'credit' ? 'udhaar' : 'jama'} safaltapoorvak likh diya.`
  });
});

// 4. Immutable Ledger Correction: Amend row (void old, create new row)
app.post('/api/entries/amend', (req, res) => {
  const { original_entry_id, customer_id, type, amount, item, qty, raw_text } = req.body;

  db.exec('BEGIN TRANSACTION;');
  try {
    // Void old entry
    db.prepare('UPDATE ledger_entries SET is_voided = 1 WHERE id = ?').run(original_entry_id);

    // Insert new amended entry
    const insertStmt = db.prepare(`
      INSERT INTO ledger_entries (customer_id, type, amount, item, qty, raw_text, amends_id, is_voided)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    `);
    const result = insertStmt.run(customer_id, type, Number(amount), item || null, qty || null, raw_text || 'Amended entry', original_entry_id);

    db.exec('COMMIT;');

    const customer = getCustomerById(customer_id);
    return res.json({
      success: true,
      entry_id: Number(result.lastInsertRowid),
      customer,
      message: 'Entry safaltapoorvak sudhaari gayi (Immutable audit trail preserved).'
    });
  } catch (err) {
    db.exec('ROLLBACK;');
    return res.status(500).json({ error: err.message });
  }
});

// 5. Get History for Customer or All
app.get('/api/history', (req, res) => {
  const { customer_id } = req.query;
  let entries;
  if (customer_id) {
    entries = db.prepare(`
      SELECT e.*, c.name as customer_name 
      FROM ledger_entries e
      JOIN customers c ON e.customer_id = c.id
      WHERE e.customer_id = ?
      ORDER BY e.id DESC
    `).all(customer_id);
  } else {
    entries = db.prepare(`
      SELECT e.*, c.name as customer_name 
      FROM ledger_entries e
      JOIN customers c ON e.customer_id = c.id
      ORDER BY e.id DESC
      LIMIT 50
    `).all();
  }
  return res.json({ entries });
});

// 6. Consent & Dispute Toggle
app.post('/api/customers/:id/toggle', (req, res) => {
  const { id } = req.params;
  const { consent, disputed, phone } = req.body;

  const cust = getCustomerById(id);
  if (!cust) return res.status(404).json({ error: 'Customer not found' });

  if (typeof consent !== 'undefined') {
    db.prepare('UPDATE customers SET consent = ? WHERE id = ?').run(consent ? 1 : 0, id);
  }
  if (typeof disputed !== 'undefined') {
    db.prepare('UPDATE customers SET disputed = ? WHERE id = ?').run(disputed ? 1 : 0, id);
  }
  if (phone) {
    db.prepare('UPDATE customers SET phone = ? WHERE id = ?').run(phone, id);
  }

  const updated = getCustomerById(id);
  return res.json({ success: true, customer: updated });
});

// 7. Twilio Call Dispatch & Safety Checks
// Call preconditions: consent = yes, opted_out = no, dispute open nahi, balance > 0
app.post('/api/reminders/call', async (req, res) => {
  const { customer_id, phone } = req.body;
  const customer = getCustomerById(customer_id);

  if (!customer) {
    return res.status(404).json({ error: 'Customer nahi mila.' });
  }

  // Pre-call Guardrail checks
  if (customer.consent !== 1) {
    return res.status(400).json({
      error: 'Guardrail: Consent = NO. Call blocked.',
      reason: 'consent_missing'
    });
  }
  if (customer.opted_out === 1) {
    return res.status(400).json({
      error: 'Guardrail: Customer ne opt-out kiya hai (Digit 0). Call blocked.',
      reason: 'opted_out'
    });
  }
  if (customer.disputed === 1) {
    return res.status(400).json({
      error: 'Guardrail: Customer par dispute open hai. Harassment roknay ke liye calls band hain.',
      reason: 'disputed'
    });
  }
  if (customer.balance <= 0) {
    return res.status(400).json({
      error: 'Guardrail: Customer ka koi udhaar baaki nahi hai (Balance <= 0).',
      reason: 'zero_balance'
    });
  }

  const targetPhone = phone || customer.phone;
  const baseUrl = process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`;

  // Log initiated call
  const callSid = 'CALL_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  db.prepare(`
    INSERT INTO call_logs (call_sid, customer_id, status, raw_summary)
    VALUES (?, ?, 'initiated', 'Call triggered for balance ₹' || ?)
  `).run(callSid, customer.id, customer.balance);

  // If real Twilio credentials are configured
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Calls.json`;
      const webhookUrl = `${baseUrl}/voice/answer?customer_id=${customer.id}`;

      const params = new URLSearchParams();
      params.append('To', targetPhone);
      params.append('From', process.env.TWILIO_PHONE_NUMBER);
      params.append('Url', webhookUrl);

      const twilioResp = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      const data = await twilioResp.json();
      if (!twilioResp.ok) {
        db.prepare("UPDATE call_logs SET status = 'failed', raw_summary = ? WHERE call_sid = ?")
          .run(data.message || 'Twilio API Error', callSid);
        return res.status(500).json({ error: 'Twilio call failed: ' + data.message, callSid });
      }

      // Update call_sid with real Twilio SID
      db.prepare("UPDATE call_logs SET call_sid = ? WHERE call_sid = ?").run(data.sid, callSid);
      return res.json({ success: true, live: true, call_sid: data.sid, message: 'Twilio call initiated successfully.' });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // Fallback demo simulator: return initiated call info (allows browser testing & demo interactive simulator)
  return res.json({
    success: true,
    live: false,
    call_sid: callSid,
    message: 'Demo Call initiated (Twilio credentials optional in demo mode). Interactive IVR ready.',
    customer
  });
});

// 8. Twilio Webhook: /voice/answer (fixed polite Devanagari TTS script)
app.all('/voice/answer', (req, res) => {
  const customerId = req.query.customer_id || req.body.customer_id;
  const customer = customerId ? getCustomerById(customerId) : null;
  const name = customer ? customer.name : 'ग्राहक';
  const balance = customer ? customer.balance : 0;
  const baseUrl = process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`;

  // Balance safety check inside webhook
  if (balance <= 0) {
    const noDebtXml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="hi-IN">नमस्ते ${name} जी। आपका ${SHOP_NAME} में कोई उधार बाकी नहीं है। धन्यवाद।</Say>
  <Hangup/>
</Response>`;
    res.type('text/xml');
    return res.send(noDebtXml);
  }

  // Appendix A Script
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="1" action="${baseUrl}/voice/response?customer_id=${customerId || ''}" method="POST" timeout="8">
    <Say language="hi-IN">नमस्ते ${name} जी। यह ${SHOP_NAME} की तरफ़ से एक ऑटोमेटेड कॉल है। आपका ${balance} रुपये का उधार बाकी है। कल तक देने के लिए 1 दबाइए। कुछ दिन बाद देने के लिए 2 दबाइए। अगर यह हिसाब आपका नहीं है, तो 3 दबाइए। आगे कॉल नहीं चाहिए, तो 0 दबाइए।</Say>
  </Gather>
  <Say language="hi-IN">कोई जवाब नहीं मिला। धन्यवाद।</Say>
  <Hangup/>
</Response>`;

  res.type('text/xml');
  return res.send(twiml);
});

// 9. Twilio Webhook: /voice/response (Keypad DTMF outcome handler)
app.all('/voice/response', (req, res) => {
  const digits = req.body.Digits || req.query.Digits;
  const callSid = req.body.CallSid || req.query.CallSid || 'SIM_' + Date.now();
  const customerId = req.query.customer_id || req.body.customer_id;
  const customer = customerId ? getCustomerById(customerId) : null;

  let outcome = 'unknown';
  let sayResponse = '';

  if (digits === '1') {
    // 1: Kal tak dunga -> promised
    outcome = 'promised';
    sayResponse = 'धन्यवाद! आपका वादा दर्ज कर लिया गया है कि आप कल तक भुगतान करेंगे।';
  } else if (digits === '2') {
    // 2: Kuch din baad -> promised_later
    outcome = 'promised_later';
    sayResponse = 'धन्यवाद! दर्ज कर लिया गया है कि आप कुछ दिन बाद भुगतान करेंगे।';
  } else if (digits === '3') {
    // 3: Yeh hisaab mera nahi -> disputed
    outcome = 'disputed';
    sayResponse = 'आपकी शिकायत दर्ज कर ली गई है। हम आगे कॉल नहीं करेंगे और दुकानदार आपसे स्वयं संपर्क करेंगे।';
    if (customerId) {
      db.prepare('UPDATE customers SET disputed = 1 WHERE id = ?').run(customerId);
    }
  } else if (digits === '0') {
    // 0: Opt-out -> aage call nahi chahiye
    outcome = 'opted_out';
    sayResponse = 'आपको कॉल सूची से हटा दिया गया है। आगे आपको कोई कॉल नहीं आएगी। धन्यवाद।';
    if (customerId) {
      db.prepare('UPDATE customers SET opted_out = 1 WHERE id = ?').run(customerId);
    }
  } else {
    // Invalid / repeat
    outcome = 'invalid';
    sayResponse = 'धन्यवाद।';
  }

  // Log or update Call outcome (Idempotent upsert)
  const existingLog = db.prepare('SELECT id FROM call_logs WHERE call_sid = ?').get(callSid);
  if (existingLog) {
    db.prepare(`
      UPDATE call_logs 
      SET status = ?, digits = ?, raw_summary = ? 
      WHERE call_sid = ?
    `).run(outcome, digits || null, sayResponse, callSid);
  } else if (customerId) {
    db.prepare(`
      INSERT INTO call_logs (call_sid, customer_id, status, digits, raw_summary)
      VALUES (?, ?, ?, ?, ?)
    `).run(callSid, customerId, outcome, digits || null, sayResponse);
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="hi-IN">${sayResponse}</Say>
  <Hangup/>
</Response>`;

  res.type('text/xml');
  return res.send(twiml);
});

// 10. Dashboard Stats & Chart Data: GET /api/stats
app.get('/api/stats', (req, res) => {
  const customers = getCustomersWithBalance();
  const totalUdhaar = customers.reduce((acc, c) => acc + (c.balance > 0 ? c.balance : 0), 0);
  const activeDebtors = customers.filter(c => c.balance > 0).length;

  const calls = db.prepare('SELECT status, COUNT(*) as cnt FROM call_logs GROUP BY status').all();
  const counts = {
    called: 0,
    promised: 0,
    disputed: 0,
    opted_out: 0
  };
  calls.forEach(r => {
    counts.called += r.cnt;
    if (r.status === 'promised' || r.status === 'promised_later') counts.promised += r.cnt;
    if (r.status === 'disputed') counts.disputed += r.cnt;
    if (r.status === 'opted_out') counts.opted_out += r.cnt;
  });

  // Latest call logs for live polling toast
  const recentLogs = db.prepare(`
    SELECT l.*, c.name as customer_name 
    FROM call_logs l
    LEFT JOIN customers c ON l.customer_id = c.id
    ORDER BY l.id DESC
    LIMIT 10
  `).all();

  // Weekly summary for Chart.js
  const weeklyData = [
    { day: 'Som', udhaar: 1200, vasooli: 400 },
    { day: 'Mangal', udhaar: 900, vasooli: 600 },
    { day: 'Budh', udhaar: 1500, vasooli: 800 },
    { day: 'Guru', udhaar: 1100, vasooli: 500 },
    { day: 'Shukra', udhaar: 1800, vasooli: 1200 },
    { day: 'Shani', udhaar: 2400, vasooli: 1500 },
    { day: 'Aaj (Ravi)', udhaar: totalUdhaar, vasooli: 850 }
  ];

  return res.json({
    total_udhaar: totalUdhaar,
    active_debtors: activeDebtors,
    counts,
    recent_logs: recentLogs,
    weekly_chart: weeklyData
  });
});

// 11. Reset Endpoint: POST /api/reset (F6 demo hygiene)
app.post('/api/reset', (req, res) => {
  seedData();
  return res.json({
    success: true,
    message: 'Demo Data reset successfully (Mohan, Sunita seeded. Ramesh = Owner).'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 UdhaarBuddy server running on http://localhost:${PORT}`);
  console.log(`📱 Login page:     http://localhost:${PORT}/login.html`);
  console.log(`🔑 Demo login:     Phone: 9876543210  |  Password: 1234`);
});
