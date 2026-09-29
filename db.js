const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

// On Vercel, the filesystem is read-only except /tmp
const DB_DIR = process.env.VERCEL || process.env.VERCEL_ENV ? '/tmp' : __dirname;
const DB_PATH = path.join(DB_DIR, 'udhar_buddy.db');
const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for high performance & foreign keys
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shop_name TEXT NOT NULL,
      owner_name TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      consent INTEGER NOT NULL DEFAULT 1,      -- 1=YES, 0=NO
      opted_out INTEGER NOT NULL DEFAULT 0,    -- 1=OPTED OUT (STOP/0), 0=ACTIVE
      disputed INTEGER NOT NULL DEFAULT 0,     -- 1=DISPUTED, 0=NORMAL
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Immutable ledger. Amends creates a new row referencing parent_id, marking parent voided
    CREATE TABLE IF NOT EXISTS ledger_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('credit', 'payment')),
      amount REAL NOT NULL,
      item TEXT,
      qty TEXT,
      raw_text TEXT,
      amends_id INTEGER,
      is_voided INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );

    CREATE TABLE IF NOT EXISTS call_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      call_sid TEXT UNIQUE,
      customer_id INTEGER NOT NULL,
      status TEXT NOT NULL, -- initiated, completed, promised, promised_later, disputed, opted_out, failed, no_answer
      digits TEXT,
      raw_summary TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
  `);

  // Always ensure demo user exists (in case DB was seeded before users table was created)
  ensureDemoUser();

  // Initialize seed if not seeded
  const seedCheck = db.prepare("SELECT value FROM meta WHERE key = 'seeded'").get();
  if (!seedCheck) {
    seedData();
  }
}

function ensureDemoUser() {
  const existing = db.prepare("SELECT id FROM users WHERE phone = '9876543210'").get();
  if (!existing) {
    db.prepare("INSERT INTO users (shop_name, owner_name, phone, password) VALUES (?, ?, ?, ?)").run(
      'Ramesh Kirana Store',
      'Ramesh',
      '9876543210',
      '1234'
    );
    console.log('Demo user created: phone=9876543210, password=1234');
  }
}

function seedData() {
  db.exec('BEGIN TRANSACTION;');
  try {
    db.exec(`
      DELETE FROM call_logs;
      DELETE FROM ledger_entries;
      DELETE FROM customers;
      DELETE FROM meta;
    `);

    db.prepare("INSERT INTO meta (key, value) VALUES ('owner_name', 'Ramesh Kirana Store')").run();
    db.prepare("INSERT INTO meta (key, value) VALUES ('seeded', 'true')").run();

    // Default shop owner account
    const existingOwner = db.prepare("SELECT id FROM users WHERE phone = '9876543210'").get();
    if (!existingOwner) {
      db.prepare("INSERT INTO users (shop_name, owner_name, phone, password) VALUES (?, ?, ?, ?)").run(
        'रमेश किराना स्टोर (Ramesh Kirana)',
        'रमेश जी (Ramesh)',
        '9876543210',
        '1234'
      );
    }

    // Ramesh is owner. Customers: Mohan, Sunita
    const insCust = db.prepare("INSERT INTO customers (id, name, phone, consent, opted_out, disputed) VALUES (?, ?, ?, ?, ?, ?)");
    insCust.run(1, 'Mohan', '+919876543210', 1, 0, 0);
    insCust.run(2, 'Sunita', '+919876543211', 1, 0, 0);

    const insLedger = db.prepare("INSERT INTO ledger_entries (customer_id, type, amount, item, qty, raw_text, is_voided) VALUES (?, ?, ?, ?, ?, ?, 0)");
    // Mohan has 500 credit
    insLedger.run(1, 'credit', 500, 'atta', '3 kilo', 'Mohan ne 3 kilo atta 500 ka udhaar liya');
    // Sunita has 150 credit
    insLedger.run(2, 'credit', 150, 'chai patti', '1 packet', 'sunita ko dedh sau udhaar');

    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

function getCustomersWithBalance() {
  const customers = db.prepare("SELECT * FROM customers ORDER BY id ASC").all();
  return customers.map(cust => {
    // Derive balance: sum(credit) - sum(payment) where is_voided = 0
    const row = db.prepare(`
      SELECT 
        COALESCE(SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN type = 'payment' THEN amount ELSE 0 END), 0) AS balance
      FROM ledger_entries
      WHERE customer_id = ? AND is_voided = 0
    `).get(cust.id);

    return {
      ...cust,
      balance: row ? Number(row.balance) : 0
    };
  });
}

function getCustomerById(id) {
  const cust = db.prepare("SELECT * FROM customers WHERE id = ?").get(id);
  if (!cust) return null;
  const row = db.prepare(`
    SELECT 
      COALESCE(SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END), 0) -
      COALESCE(SUM(CASE WHEN type = 'payment' THEN amount ELSE 0 END), 0) AS balance
    FROM ledger_entries
    WHERE customer_id = ? AND is_voided = 0
  `).get(id);
  return {
    ...cust,
    balance: row ? Number(row.balance) : 0
  };
}

module.exports = {
  db,
  initSchema,
  seedData,
  ensureDemoUser,
  getCustomersWithBalance,
  getCustomerById
};
