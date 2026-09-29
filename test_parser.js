const { parseHinglishEntry } = require('./parser');

const mockCustomers = [
  { id: 1, name: 'Mohan', phone: '+919876543210' },
  { id: 2, name: 'Sunita', phone: '+919876543211' }
];

const testCases = [
  {
    sentence: "Mohan ne 3 kilo atta paanch sau ka udhaar liya",
    check: (res) => res.customer_name === 'Mohan' && res.type === 'credit' && res.amount === 500 && res.item === 'atta' && res.qty.includes('3 kilo')
  },
  {
    sentence: "मोहन ने 200 जमा किया",
    check: (res) => res.customer_name === 'Mohan' && res.type === 'payment' && res.amount === 200
  },
  {
    sentence: "sunita ko dedh sau udhaar",
    check: (res) => res.customer_name === 'Sunita' && res.type === 'credit' && res.amount === 150
  },
  {
    sentence: "Mohan ne 2 packet chai 40 ka",
    check: (res) => res.customer_name === 'Mohan' && res.type === 'credit' && res.amount === 40 && res.item === 'chai'
  },
  {
    sentence: "uska 200 jama ho gaya",
    contextId: 1, // Mohan was last active
    check: (res) => res.customer_name === 'Mohan' && res.type === 'payment' && res.amount === 200 && res.is_context_used === true
  },
  {
    sentence: "Mohan ne 500 wapas diye",
    check: (res) => res.customer_name === 'Mohan' && res.type === 'payment' && res.amount === 500
  },
  {
    sentence: "ek hazaar udhaar Sunita ko",
    check: (res) => res.customer_name === 'Sunita' && res.type === 'credit' && res.amount === 1000
  },
  {
    sentence: "Mohan 3 kilo atta",
    check: (res) => res.status === 'clarify' && res.clarify === 'amount' && res.customer.name === 'Mohan'
  },
  {
    sentence: "Mohan",
    check: (res) => res.status === 'clarify' && (res.clarify === 'amount' || res.clarify === 'details')
  },
  {
    sentence: "asdf qwer",
    check: (res) => res.status === 'clarify' && res.message.includes('Dobara')
  }
];

console.log("=== RUNNING PARSER TEST SUITE (Appendix B) ===");
let passed = 0;
testCases.forEach((tc, idx) => {
  const res = parseHinglishEntry(tc.sentence, mockCustomers, tc.contextId || null);
  const ok = tc.check(res);
  if (ok) {
    passed++;
    console.log(`✅ Test ${idx + 1} PASSED: "${tc.sentence}" ->`, res.status === 'success' ? `${res.customer_name} | ${res.type} | ₹${res.amount}` : `Clarify (${res.clarify})`);
  } else {
    console.error(`❌ Test ${idx + 1} FAILED: "${tc.sentence}" ->`, res);
  }
});

console.log(`\nResult: ${passed}/${testCases.length} tests passed (${Math.round(passed/testCases.length * 100)}%)`);
if (passed === testCases.length) {
  process.exit(0);
} else {
  process.exit(1);
}
