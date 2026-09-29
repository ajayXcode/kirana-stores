// Parser for Hinglish Kirana Voice/Text entries

// Hindi/Hinglish number words to numeric values
const NUMBER_WORDS = {
  'ek': 1, 'do': 2, 'teen': 3, 'chaar': 4, 'char': 4, 'paanch': 5, 'panch': 5,
  'chhe': 6, 'che': 6, 'saat': 7, 'sat': 7, 'aath': 8, 'ath': 8, 'nau': 9, 'no': 9,
  'das': 10, 'gyaarah': 11, 'baarah': 12, 'terah': 13, 'chaudah': 14, 'pandrah': 15,
  'solah': 16, 'satrah': 17, 'athaarah': 18, 'unnees': 19, 'bees': 20,
  'pachees': 25, 'tees': 30, 'paintees': 35, 'chaalees': 40, 'chalis': 40,
  'pachaas': 50, 'pachas': 50, 'saath': 60, 'sattar': 70, 'assi': 80, 'nabbe': 90,
  'sau': 100, 'dedh sau': 150, 'dhai sau': 250, 'hazaar': 1000, 'hazar': 1000,
  'laakh': 100000, 'lakh': 100000,
  // Devanagari numerals
  '१': 1, '२': 2, '३': 3, '४': 4, '५': 5, '६': 6, '७': 7, '८': 8, '९': 9, '०': 0,
  'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पांच': 5, 'पाँच': 5, 'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10,
  'सौ': 100, 'हजार': 1000, 'डेढ़ सौ': 150, 'ढाई सौ': 250
};

// Convert Devanagari digits to ASCII digits
function normalizeDevanagariDigits(str) {
  const map = { '०':'0', '१':'1', '२':'2', '३':'3', '४':'4', '५':'5', '६':'6', '७':'7', '८':'8', '९':'9' };
  return str.replace(/[०-९]/g, d => map[d] || d);
}

// Detect item & quantity first: "3 kilo atta", "2 packet chai"
function extractItemAndQty(text) {
  const norm = normalizeDevanagariDigits(text);
  // Match quantity with unit: "3 kilo", "2 packet", "500 gram", "1 litre"
  const qtyItemRegex = /(\d+\s*(?:kilo|kg|packet|pkt|litre|l|gram|gm|darjan|piece|pc|bori))\s+([a-zA-Z\u0900-\u097F]+)/i;
  const match = norm.match(qtyItemRegex);
  if (match) {
    const qty = match[1].trim();
    const item = match[2].trim();
    if (!['ne', 'ko', 'ka', 'se', 'hai', 'ki'].includes(item.toLowerCase())) {
      return { qty, item, matchedSpan: match[0] };
    }
  }

  // Fallback: search known kirana items without explicit unit
  const items = ['atta', 'aata', 'आटा', 'chai', 'चाय', 'cheeni', 'chini', 'चीनी', 'tel', 'तेल', 'chawal', 'चावल', 'doodh', 'दूध', 'daal', 'दाल', 'sabun', 'साबुन', 'biscuit', 'बिस्कुट'];
  for (const it of items) {
    const rx = new RegExp(`(?:(\\d+)\\s+)?\\b(${it})\\b`, 'i');
    const m = norm.match(rx);
    if (m) {
      return { qty: m[1] ? m[1].trim() : null, item: it, matchedSpan: m[0] };
    }
  }

  return { qty: null, item: null, matchedSpan: null };
}

// Extract number from words or digits in text, ignoring matched quantity span
function extractAmount(text, qtySpan = null) {
  let norm = normalizeDevanagariDigits(text.toLowerCase());

  // Compound phrases first
  if (norm.includes('dedh sau') || norm.includes('डेढ़ सौ')) return 150;
  if (norm.includes('dhai sau') || norm.includes('ढाई सौ')) return 250;

  // Patterns like "paanch sau" / "5 sau" / "500" / "500 ka" / "ek hazaar"
  const wordMultiplierRegex = /(ek|do|teen|chaar|char|paanch|panch|chhe|che|saat|sat|aath|ath|nau|no|das|एक|दो|तीन|चार|पांच|पाँच|\d+)\s*(sau|hazaar|hazar|सौ|हजार)/i;
  const multMatch = norm.match(wordMultiplierRegex);
  if (multMatch) {
    let base = 1;
    const baseStr = multMatch[1];
    if (/^\d+$/.test(baseStr)) {
      base = parseInt(baseStr, 10);
    } else if (NUMBER_WORDS[baseStr]) {
      base = NUMBER_WORDS[baseStr];
    }
    const unitStr = multMatch[2];
    const unit = (unitStr === 'sau' || unitStr === 'सौ') ? 100 : 1000;
    return base * unit;
  }

  // If we had a matched quantity span like "3 kilo atta" or "2 packet chai", blank it out when finding money amount
  let textForAmount = norm;
  if (qtySpan) {
    textForAmount = textForAmount.replace(qtySpan.toLowerCase(), ' ');
  }

  // Find explicit amount pattern: "40 ka", "500 rupaye", "₹200", "200 jama"
  const explicitAmountMatch = textForAmount.match(/(?:rs\.?|₹|rupaye|rupee|rupya)?\s*(\d+(?:\.\d+)?)\s*(?:rs\.?|₹|rupaye|rupee|rupya|ka|ki|ke|jama|udhaar|baki|wapas)?/i);
  
  // Find all remaining isolated numbers
  const allNumbers = [...textForAmount.matchAll(/\b(\d+(?:\.\d+)?)\b/g)];
  if (allNumbers.length > 0) {
    // Look for number with monetary indicators
    for (const m of allNumbers) {
      const idx = m.index;
      const snippet = textForAmount.slice(Math.max(0, idx - 10), Math.min(textForAmount.length, idx + m[0].length + 12));
      if (/ka|ki|ke|rupaye|rs|₹|jama|udhaar|wapas/i.test(snippet)) {
        return parseFloat(m[1]);
      }
    }
    // Return first clean remaining number
    return parseFloat(allNumbers[0][1]);
  }

  // Standalone number words: "chaalees", "pachaas", "sau", "hazaar"
  for (const [w, val] of Object.entries(NUMBER_WORDS)) {
    const rx = new RegExp(`\\b${w}\\b`, 'i');
    if (rx.test(textForAmount)) {
      return val;
    }
  }

  return null;
}

// Main parser function
function parseHinglishEntry(rawText, existingCustomers = [], lastActiveCustomerId = null) {
  if (!rawText || !rawText.trim()) {
    return {
      status: 'error',
      message: 'Dobara boliye',
      clarify: 'empty'
    };
  }

  const text = rawText.trim();
  const lower = text.toLowerCase();

  // Gibberish check: if minimal vowels or random characters
  const cleanChars = text.replace(/[^a-zA-Z\u0900-\u097F\d]/g, '');
  if (cleanChars.length < 3 || /^[bcdfghjklmnpqrstvwxyz]{4,}$/i.test(cleanChars)) {
    return {
      status: 'clarify',
      message: 'Dobara boliye',
      clarify: 'gibberish',
      raw_text: text
    };
  }

  // 1. Extract Item & Qty first
  const { qty, item, matchedSpan } = extractItemAndQty(text);

  // 2. Extract Amount (ignoring quantity phrase)
  const amount = extractAmount(text, matchedSpan);

  // 3. Determine Type: Credit vs Payment
  let type = 'credit';
  if (/jama|wapas|diya|chukaya|paid|pay|deposite|जमा|वापस|दिया/i.test(lower)) {
    type = 'payment';
  } else if (/udhaar|udhar|liya|credit|baki|baaki|उधार|लिया/i.test(lower)) {
    type = 'credit';
  }

  // 4. Identify Customer & Context Memory ("uska", "usko", "उसका", "उसके")
  const isContextPronoun = /\b(uska|usko|unka|unko|uske|उसका|उसको|उनके|उसके)\b/i.test(lower);
  let customerMatch = null;
  let isContextUsed = false;

  if (isContextPronoun && lastActiveCustomerId) {
    const found = existingCustomers.find(c => c.id === lastActiveCustomerId);
    if (found) {
      customerMatch = found;
      isContextUsed = true;
    }
  }

  if (!customerMatch) {
    for (const c of existingCustomers) {
      const nameLower = c.name.toLowerCase();
      const nameRegex = new RegExp(`\\b${nameLower}\\b`, 'i');
      if (nameRegex.test(lower) || (nameLower === 'mohan' && /मोहन/i.test(text)) || (nameLower === 'sunita' && /सुनीता/i.test(text))) {
        customerMatch = c;
        break;
      }
    }
  }

  // 5. Handle Customer Match & Auto-detection for New Customer names
  if (!customerMatch && !isContextPronoun) {
    // Try to extract potential name before words like 'ne', 'ko', 'ka', '500', 'udhaar'
    const nameMatch = text.match(/^([A-Z\u0900-\u097F][a-zA-Z\u0900-\u097F]+)(?:\s+(?:ne|ko|ka|se|ने|को|का))?/i);
    let potentialNewName = null;
    if (nameMatch && nameMatch[1]) {
      const candidate = nameMatch[1].trim();
      const reserved = ['ek', 'do', 'teen', 'chaar', 'paanch', 'sau', 'hazaar', 'uska', 'usko', 'kuch', 'koi', 'kal'];
      if (!reserved.includes(candidate.toLowerCase()) && candidate.length > 2) {
        potentialNewName = candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
    }

    if (potentialNewName && amount !== null) {
      // Offer auto-creation of this new customer
      return {
        status: 'clarify',
        clarify: 'new_customer',
        message: `Naya customer "${potentialNewName}" jodna hai?`,
        suggested_name: potentialNewName,
        candidates: [
          { id: 'NEW', name: `+ Create "${potentialNewName}"` },
          ...existingCustomers.map(c => ({ id: c.id, name: c.name }))
        ],
        partial: { type, amount, item, qty, raw_text: text, new_customer_name: potentialNewName }
      };
    }

    if (amount !== null) {
      return {
        status: 'clarify',
        clarify: 'customer',
        message: 'Kaun se customer ke khaate mein likhna hai?',
        candidates: existingCustomers.map(c => ({ id: c.id, name: c.name })),
        partial: { type, amount, item, qty, raw_text: text }
      };
    } else {
      return {
        status: 'clarify',
        clarify: 'details',
        message: 'Dobara boliye: Customer aur amount dono bataiye (jaise: "Rajesh 500 udhaar")',
        candidates: existingCustomers.map(c => ({ id: c.id, name: c.name })),
        raw_text: text
      };
    }
  }

  // Case B: Customer found, but Amount missing
  if (customerMatch && (amount === null || isNaN(amount) || amount <= 0)) {
    return {
      status: 'clarify',
      clarify: 'amount',
      customer: customerMatch,
      message: `${customerMatch.name} ke liye kitne rupaye likhna hai?`,
      candidates: [50, 100, 200, 500, 1000],
      partial: {
        customer_id: customerMatch.id,
        customer_name: customerMatch.name,
        type,
        item,
        qty,
        raw_text: text
      }
    };
  }

  // 6. Confirmed parsed output
  return {
    status: 'success',
    customer: customerMatch,
    customer_id: customerMatch ? customerMatch.id : null,
    customer_name: customerMatch ? customerMatch.name : null,
    type,
    amount,
    item,
    qty,
    is_context_used: isContextUsed,
    raw_text: text
  };
}

module.exports = {
  parseHinglishEntry,
  extractAmount,
  extractItemAndQty,
  NUMBER_WORDS
};
