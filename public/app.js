// UdhaarBuddy Frontend Client Application (Grocery Shop Friendly Language)

const I18N = {
  en: {
    appName: "UdhaarBuddy",
    navOverview: "MENU",
    navDashboard: "Shop Home",
    navCustomers: "Customers & Khata",
    navLedger: "Khata Book History",
    navSafety: "CUSTOMER RULES",
    navConsent: "Customer Agrees to Calls",
    navEnforced: "Active",
    navAntiHarass: "No Disturb Policy",
    navActive: "Safe",
    gatewayTitle: "Phone Call Service",
    gatewaySub: "Online & Ready to Dial",
    kiranaBreadcrumb: "My Grocery Shop",
    pageTitle: "Daily Khata & Reminder Calls",
    btnReset: "Reset Sample Data",
    liveSync: "Live Updates",
    kpiTotalDebt: "Total Due From Customers",
    kpiTotalDebtDesc: "Total money to be collected",
    kpiActiveDebtors: "Customers With Due Balance",
    kpiActiveDebtorsDesc: "People who have taken credit",
    kpiPromised: "Promised to Pay",
    kpiPromisedDesc: "Customers who said yes on call",
    kpiDisputed: "Disputed / Wrong Bill",
    kpiDisputedDesc: "Customer pressed 3 (Calls stopped)",
    voiceHeading: "🎙️ Add Entry by Speaking or Typing",
    voiceSubheading: "Speak in normal Hindi or English • App remembers the last customer automatically",
    coreBadge: "Fast Counter Entry",
    micReady: "Click mic and speak, or type below",
    micListening: "Listening... (e.g., 'Mohan took 500 udhaar' or 'Mohan ne 500 ka udhaar liya')",
    micError: "Mic did not catch words. Please type below.",
    btnParse: "Save to Book",
    scenariosLabel: "Try Sample Sentences:",
    clarifyTitle: "One quick detail needed",
    clarifySub: "Click the right button below so there is zero mistake",
    parseSuccess: "Entry Ready",
    confirmHeading: "Check Details and Confirm",
    btnCancel: "Cancel (Esc)",
    btnConfirmSave: "Confirm & Save to Khata",
    custHeading: "👥 Customers & Reminder Calls",
    custSubheading: "Send polite automated call reminders with one click",
    ledgerHeading: "📊 This Week's Udhaar & Payments",
    ledgerSubheading: "Complete record book of all items given and money collected",
    thTime: "Time",
    thCustomer: "Customer",
    thType: "Udhaar / Jama",
    thItem: "Item",
    thAmount: "Amount (₹)",
    thAudit: "Status",
    modalCallTitle: "📞 Automatic Reminder Call",
    modalCallConnected: "Call in progress...",
    scriptTag: "What the customer hears on the phone:",
    dtmfInstruction: "Customer presses a number on their phone:",
    dtmf1: "Will pay by tomorrow",
    dtmf2: "Will pay in few days",
    dtmf3: "Not my bill (Wrong)",
    dtmf0: "Don't call me again",
    creditText: "Udhaar (Credit)",
    paymentText: "Jama (Paid)",
    callBtnText: "Send Reminder Call",
    noDebtText: "No money due (Clear)",
    consentNoText: "Customer opted out of calls",
    optOutText: "Do Not Call list (0)",
    disputeText: "Wrong Bill Reported (3)",
    confirmCustomer: "Customer Name",
    confirmType: "Given / Paid",
    confirmAmount: "Total Amount",
    confirmItem: "Items Bought"
  },
  hi: {
    appName: "उधार बडी",
    navOverview: "मेनू",
    navDashboard: "दुकान होम",
    navCustomers: "ग्राहक और खाता",
    navLedger: "खाता बही इतिहास",
    navSafety: "ग्राहक नियम",
    navConsent: "कॉल की अनुमति",
    navEnforced: "सक्रिय",
    navAntiHarass: "परेशानी मुक्त नियम",
    navActive: "सुरक्षित",
    gatewayTitle: "फोन कॉल सेवा",
    gatewaySub: "तैयार • ऑटो कॉल चालू",
    kiranaBreadcrumb: "मेरी किराना दुकान",
    pageTitle: "रोज़ाना खाता व याद दिलाने वाली कॉल",
    btnReset: "सैंपल डेटा रीसेट",
    liveSync: "लाइव अपडेट",
    kpiTotalDebt: "ग्राहकों से कुल बाकी रकम",
    kpiTotalDebtDesc: "कुल पैसा जो वापस लेना बाकी है",
    kpiActiveDebtors: "उधार वाले ग्राहक",
    kpiActiveDebtorsDesc: "जिनके पास दुकान का पैसा बाकी है",
    kpiPromised: "देने का वादा किया",
    kpiPromisedDesc: "कॉल पर जिन्होंने हां बोला",
    kpiDisputed: "गलत बिल / विवाद",
    kpiDisputedDesc: "ग्राहक ने 3 दबाया (कॉल्स बंद)",
    voiceHeading: "🎙️ बोलकर या लिखकर खाता दर्ज करें",
    voiceSubheading: "रोज़मर्रा की भाषा में बोलें • ऐप पिछले ग्राहक को अपने आप याद रखता है",
    coreBadge: "काउंटर पर तुरंत एंट्री",
    micReady: "माइक दबाकर बोलें या नीचे लिखें",
    micListening: "सुन रहे हैं... (जैसे: 'Mohan ne 500 ka udhaar liya')",
    micError: "माइक से आवाज़ नहीं आई। नीचे टाइप करें।",
    btnParse: "खाते में लिखो",
    scenariosLabel: "सैंपल वाक्य आज़माएं:",
    clarifyTitle: "एक छोटी सी जानकारी चाहिए",
    clarifySub: "नीचे सही बटन दबाएं ताकि कोई गलती न हो",
    parseSuccess: "एंट्री तैयार है",
    confirmHeading: "विवरण देखकर पक्का करें",
    btnCancel: "रद्द करें (Esc)",
    btnConfirmSave: "खाते में पक्का लिखो",
    custHeading: "👥 ग्राहक और याद दिलाने वाली कॉल",
    custSubheading: "एक क्लिक में ग्राहक को विनम्र कॉल रिमाइंडर भेजें",
    ledgerHeading: "📊 इस हफ्ते का उधार और वसूली",
    ledgerSubheading: "दिए गए सामान और मिले पैसों का पक्का हिसाब",
    thTime: "समय",
    thCustomer: "ग्राहक का नाम",
    thType: "उधार या जमा",
    thItem: "सामान",
    thAmount: "रकम (₹)",
    thAudit: "स्टेटस",
    modalCallTitle: "📞 ऑटोमैटिक याद दिलाने वाली कॉल",
    modalCallConnected: "कॉल चालू है...",
    scriptTag: "ग्राहक को फोन पर क्या सुनाई देगा:",
    dtmfInstruction: "ग्राहक अपने फोन पर बटन दबाएगा:",
    dtmf1: "कल तक दूंगा",
    dtmf2: "कुछ दिन बाद",
    dtmf3: "हिसाब मेरा नहीं है (गलत)",
    dtmf0: "आगे मुझे कॉल मत करो",
    creditText: "उधार (बाकी)",
    paymentText: "जमा (मिल गए)",
    callBtnText: "याद दिलाने वाली कॉल भेजें",
    noDebtText: "कोई बाकी नहीं (खाता साफ़)",
    consentNoText: "कॉल की अनुमति बंद",
    optOutText: "कॉल मत करो लिस्ट (0)",
    disputeText: "गलत हिसाब बोला (3)",
    confirmCustomer: "ग्राहक का नाम",
    confirmType: "उधार / जमा",
    confirmAmount: "रकम",
    confirmItem: "सामान"
  }
};

let currentLang = 'en';

let state = {
  customers: [],
  lastCustomerId: null,
  pendingEntry: null,
  activeCallCustomerId: null,
  activeCallSid: null,
  lastProcessedLogId: 0
};

// DOM References
const micBtn = document.getElementById('micBtn');
const micStatus = document.getElementById('micStatus');
const voiceTextInput = document.getElementById('voiceTextInput');
const btnParseText = document.getElementById('btnParseText');
const clarifyContainer = document.getElementById('clarifyContainer');
const clarifyMessage = document.getElementById('clarifyMessage');
const clarifyButtons = document.getElementById('clarifyButtons');
const confirmCard = document.getElementById('confirmCard');
const confirmDetails = document.getElementById('confirmDetails');
const btnConfirmSave = document.getElementById('btnConfirmSave');
const btnCancelEntry = document.getElementById('btnCancelEntry');
const btnDismissConfirm = document.getElementById('btnDismissConfirm');
const btnResetSeed = document.getElementById('btnResetSeed');
const customersList = document.getElementById('customersList');
const ledgerHistoryBody = document.getElementById('ledgerHistoryBody');
const toastContainer = document.getElementById('toastContainer');
const callModal = document.getElementById('callModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const ivrCustomerInfo = document.getElementById('ivrCustomerInfo');
const ivrScriptText = document.getElementById('ivrScriptText');
const btnLangEn = document.getElementById('btnLangEn');
const btnLangHi = document.getElementById('btnLangHi');

// Add Customer Modal DOM
const btnOpenAddCustomer = document.getElementById('btnOpenAddCustomer');
const addCustomerModal = document.getElementById('addCustomerModal');
const btnCloseAddCustomer = document.getElementById('btnCloseAddCustomer');
const btnCancelAddCustomer = document.getElementById('btnCancelAddCustomer');
const btnSaveNewCustomer = document.getElementById('btnSaveNewCustomer');
const newCustName = document.getElementById('newCustName');
const newCustPhone = document.getElementById('newCustPhone');

if (btnOpenAddCustomer) {
  btnOpenAddCustomer.addEventListener('click', () => {
    addCustomerModal.classList.remove('hidden');
    newCustName.value = '';
    newCustPhone.value = '';
    newCustName.focus();
  });
}

if (btnCloseAddCustomer) {
  btnCloseAddCustomer.addEventListener('click', () => addCustomerModal.classList.add('hidden'));
}
if (btnCancelAddCustomer) {
  btnCancelAddCustomer.addEventListener('click', () => addCustomerModal.classList.add('hidden'));
}

if (btnSaveNewCustomer) {
  btnSaveNewCustomer.addEventListener('click', async () => {
    const name = newCustName.value.trim();
    const phone = newCustPhone.value.trim();

    if (!name) {
      showToast('Please enter customer name.', 'warning');
      return;
    }

    try {
      const resp = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
      });
      const data = await resp.json();
      if (data.success) {
        showToast(`Customer ${data.customer.name} added to Khata!`, 'success');
        addCustomerModal.classList.add('hidden');
        loadCustomers();
        loadStats();
      } else {
        showToast('Error: ' + data.error, 'danger');
      }
    } catch (e) {
      showToast('Error adding customer: ' + e.message, 'danger');
    }
  });
}

// Stats DOM
const statTotalUdhaar = document.getElementById('statTotalUdhaar');
const statDebtors = document.getElementById('statDebtors');
const statPromised = document.getElementById('statPromised');
const statDisputed = document.getElementById('statDisputed');

let weeklyChartInstance = null;

// Apply i18n
function setLanguage(lang) {
  currentLang = lang;
  if (lang === 'en') {
    btnLangEn.classList.add('active');
    btnLangHi.classList.remove('active');
  } else {
    btnLangHi.classList.add('active');
    btnLangEn.classList.remove('active');
  }

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  renderCustomers();
  loadHistory();
}

btnLangEn.addEventListener('click', () => setLanguage('en'));
btnLangHi.addEventListener('click', () => setLanguage('hi'));

// Browser Voice Readback
function speakReadback(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}

// Toast helper
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'warning' ? '⚠' : '✕'}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

// 1. Voice Recognition Setup (Web Speech API hi-IN / en-IN)
let recognition = null;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRec();
  recognition.lang = 'hi-IN';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    micBtn.classList.add('listening');
    micStatus.textContent = I18N[currentLang].micListening;
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    voiceTextInput.value = transcript;
    processInputText(transcript);
  };

  recognition.onerror = () => {
    micBtn.classList.remove('listening');
    micStatus.textContent = I18N[currentLang].micError;
  };

  recognition.onend = () => {
    micBtn.classList.remove('listening');
  };
}

micBtn.addEventListener('click', () => {
  if (recognition) {
    try {
      recognition.start();
    } catch (e) {
      recognition.stop();
    }
  } else {
    alert('Web Speech is not supported in this browser. Please type.');
  }
});

// 2. Input Processing & Parsing
async function processInputText(text) {
  if (!text || !text.trim()) return;
  hideClarify();
  hideConfirm();

  try {
    const resp = await fetch('/api/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        last_customer_id: state.lastCustomerId
      })
    });
    const data = await resp.json();

    if (data.status === 'clarify') {
      showClarification(data);
    } else if (data.status === 'success') {
      showConfirmation(data);
    } else {
      showToast(data.message || 'Please say again.', 'warning');
    }
  } catch (err) {
    showToast('Cannot connect to shop server: ' + err.message, 'danger');
  }
}

btnParseText.addEventListener('click', () => {
  processInputText(voiceTextInput.value);
});

voiceTextInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    processInputText(voiceTextInput.value);
  }
});

// Preset Chips Click
document.querySelectorAll('.badge-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-text');
    voiceTextInput.value = text;
    processInputText(text);
  });
});

// 3. Clarification UI
function showClarification(data) {
  clarifyContainer.classList.remove('hidden');
  clarifyMessage.textContent = currentLang === 'en' 
    ? (data.clarify === 'amount' ? `How much rupees for ${data.customer ? data.customer.name : 'this customer'}?` : (data.clarify === 'customer' ? 'Which customer account should I write in?' : 'Could not understand clearly. Please speak again.'))
    : data.message;
  clarifyButtons.innerHTML = '';

  if ((data.clarify === 'customer' || data.clarify === 'new_customer') && data.candidates) {
    data.candidates.forEach(cand => {
      const btn = document.createElement('button');
      btn.className = 'clarify-btn';
      if (cand.id === 'NEW') {
        btn.style.borderColor = '#10B981';
        btn.style.color = '#34D399';
      }
      btn.textContent = cand.name;
      btn.onclick = async () => {
        if (cand.id === 'NEW') {
          // Auto create this new customer on the fly
          const newName = data.suggested_name || data.partial.new_customer_name;
          try {
            const resp = await fetch('/api/customers', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: newName })
            });
            const createdData = await resp.json();
            if (createdData.success) {
              showToast(`New customer "${newName}" added to Khata!`, 'success');
              await loadCustomers();
              data.partial.customer_id = createdData.customer.id;
              data.partial.customer_name = createdData.customer.name;
              showConfirmation({
                ...data.partial,
                customer: createdData.customer
              });
              hideClarify();
              return;
            }
          } catch (err) {
            showToast('Error creating customer: ' + err.message, 'danger');
          }
        }

        data.partial.customer_id = cand.id;
        data.partial.customer_name = cand.name;
        showConfirmation({
          ...data.partial,
          customer: { id: cand.id, name: cand.name }
        });
        hideClarify();
      };
      clarifyButtons.appendChild(btn);
    });
  } else if (data.clarify === 'amount' && data.candidates) {
    data.candidates.forEach(amt => {
      const btn = document.createElement('button');
      btn.className = 'clarify-btn';
      btn.textContent = `₹${amt}`;
      btn.onclick = () => {
        data.partial.amount = amt;
        showConfirmation({
          ...data.partial,
          customer: data.customer
        });
        hideClarify();
      };
      clarifyButtons.appendChild(btn);
    });
  } else {
    const retryBtn = document.createElement('button');
    retryBtn.className = 'clarify-btn';
    retryBtn.textContent = currentLang === 'en' ? '🔄 Speak Again' : '🔄 दोबारा बोलिए';
    retryBtn.onclick = () => {
      hideClarify();
      voiceTextInput.value = '';
      if (recognition) recognition.start();
    };
    clarifyButtons.appendChild(retryBtn);
  }
}

function hideClarify() {
  clarifyContainer.classList.add('hidden');
  clarifyButtons.innerHTML = '';
}

// 4. Tap-to-confirm Card
function showConfirmation(entry) {
  state.pendingEntry = entry;
  confirmCard.classList.remove('hidden');

  const dict = I18N[currentLang];
  confirmDetails.innerHTML = `
    <div class="confirm-item">
      <div class="lbl">${dict.confirmCustomer}</div>
      <div class="val">${entry.customer_name || (entry.customer && entry.customer.name)}</div>
    </div>
    <div class="confirm-item">
      <div class="lbl">${dict.confirmType}</div>
      <div class="val ${entry.type === 'credit' ? 'text-destructive' : 'text-emerald'}">
        ${entry.type === 'credit' ? dict.creditText : dict.paymentText}
      </div>
    </div>
    <div class="confirm-item">
      <div class="lbl">${dict.confirmAmount}</div>
      <div class="val">₹${entry.amount}</div>
    </div>
    <div class="confirm-item">
      <div class="lbl">${dict.confirmItem}</div>
      <div class="val">${entry.qty ? entry.qty + ' ' : ''}${entry.item || (currentLang === 'en' ? 'General grocery' : 'किराना सामान')}</div>
    </div>
  `;
}

function hideConfirm() {
  confirmCard.classList.add('hidden');
  state.pendingEntry = null;
}

btnDismissConfirm.addEventListener('click', hideConfirm);
btnCancelEntry.addEventListener('click', hideConfirm);

// Confirm Save -> Immutable Ledger
btnConfirmSave.addEventListener('click', async () => {
  if (!state.pendingEntry) return;

  const entry = state.pendingEntry;
  const payload = {
    customer_id: entry.customer_id || (entry.customer && entry.customer.id),
    type: entry.type,
    amount: entry.amount,
    item: entry.item,
    qty: entry.qty,
    raw_text: entry.raw_text
  };

  try {
    const resp = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await resp.json();

    if (result.success) {
      state.lastCustomerId = payload.customer_id;
      hideConfirm();
      voiceTextInput.value = '';

      const readbackText = currentLang === 'en'
        ? `Saved ${payload.type === 'credit' ? 'udhaar' : 'payment'} of ₹${payload.amount} in ${result.customer.name}'s khata.`
        : `${result.customer.name} का ${payload.amount} रुपये का ${payload.type === 'credit' ? 'उधार' : 'जमा'} लिख दिया।`;

      speakReadback(readbackText);
      showToast(readbackText, 'success');

      loadCustomers();
      loadHistory();
      loadStats();
    } else {
      showToast('Could not save: ' + result.error, 'danger');
    }
  } catch (err) {
    showToast('Error: ' + err.message, 'danger');
  }
});

// 5. Load Customers List & Call Triggering
async function loadCustomers() {
  try {
    const resp = await fetch('/api/customers');
    const data = await resp.json();
    state.customers = data.customers;
    if (sidebarCustCount) sidebarCustCount.textContent = data.customers.length;
    renderCustomers();
  } catch (err) {
    console.error('Error loading customers:', err);
  }
}

function renderCustomers() {
  customersList.innerHTML = '';
  const dict = I18N[currentLang];

  state.customers.forEach(cust => {
    const card = document.createElement('div');
    card.className = 'customer-card';

    const isBlocked = cust.consent !== 1 || cust.opted_out === 1 || cust.disputed === 1 || cust.balance <= 0;
    let blockReason = '';
    if (cust.balance <= 0) blockReason = dict.noDebtText;
    else if (cust.consent !== 1) blockReason = dict.consentNoText;
    else if (cust.opted_out === 1) blockReason = dict.optOutText;
    else if (cust.disputed === 1) blockReason = dict.disputeText;

    card.innerHTML = `
      <div class="customer-card-header">
        <div>
          <div class="cust-name">${cust.name}</div>
          <div class="cust-phone">${cust.phone}</div>
        </div>
        <div class="cust-balance ${cust.balance > 0 ? 'text-destructive' : 'text-emerald'}">
          ₹${cust.balance} ${cust.balance > 0 ? (currentLang === 'en' ? 'due' : 'बाकी') : (currentLang === 'en' ? 'clear' : 'साफ़')}
        </div>
      </div>

      <div class="guardrail-row">
        <!-- Consent Toggle -->
        <label class="consent-toggle-label">
          <input type="checkbox" ${cust.consent === 1 ? 'checked' : ''} onchange="toggleConsent(${cust.id}, this.checked)">
          <span>${currentLang === 'en' ? 'Customer agreed to calls' : 'कॉल की अनुमति चालू'}</span>
        </label>

        <!-- Status Badges -->
        ${cust.disputed === 1 ? `<span class="badge badge-dispute">${currentLang === 'en' ? 'WRONG BILL' : 'गलत हिसाब'}</span>` : ''}
        ${cust.opted_out === 1 ? `<span class="badge badge-optout">${currentLang === 'en' ? 'DO NOT CALL' : 'कॉल बंद'}</span>` : ''}
        ${cust.disputed === 0 && cust.opted_out === 0 && cust.consent === 1 ? `<span class="badge badge-clean">${currentLang === 'en' ? 'Ready for Call' : 'कॉल तैयार'}</span>` : ''}
      </div>

      <!-- Action Button -->
      <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 0.5rem;">
        <button class="btn btn-call" ${isBlocked ? 'disabled title="' + blockReason + '"' : ''} onclick="triggerCall(${cust.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>${dict.callBtnText}</span>
        </button>
        ${isBlocked ? `<span style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">(${blockReason})</span>` : ''}
      </div>
    `;

    customersList.appendChild(card);
  });
}

// Toggle Customer Consent
window.toggleConsent = async function(id, val) {
  try {
    const resp = await fetch(`/api/customers/${id}/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: val ? 1 : 0 })
    });
    const data = await resp.json();
    if (data.success) {
      showToast(currentLang === 'en' ? `Call permission updated: ${val ? 'ON' : 'OFF'}` : `कॉल अनुमति ${val ? 'चालू' : 'बंद'}`, 'warning');
      loadCustomers();
    }
  } catch (err) {
    showToast('Error: ' + err.message, 'danger');
  }
};

// 6. Automated Call Trigger & IVR Modal
window.triggerCall = async function(customerId) {
  const cust = state.customers.find(c => c.id === customerId);
  if (!cust) return;

  state.activeCallCustomerId = customerId;

  try {
    const resp = await fetch('/api/reminders/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_id: customerId })
    });
    const result = await resp.json();

    if (!resp.ok) {
      showToast(result.error || 'Call could not be placed', 'danger');
      return;
    }

    state.activeCallSid = result.call_sid;

    ivrCustomerInfo.textContent = `${currentLang === 'en' ? 'Calling' : 'कॉल जा रही है'}: ${cust.name} (${cust.phone}) • Due: ₹${cust.balance}`;
    ivrScriptText.textContent = `नमस्ते ${cust.name} जी। यह रमेश किराना स्टोर की तरफ़ से एक ऑटोमेटेड कॉल है। आपका ${cust.balance} रुपये का उधार बाकी है। कल तक देने के लिए 1 दबाइए। कुछ दिन बाद देने के लिए 2 दबाइए। अगर यह हिसाब आपका नहीं है, तो 3 दबाइए। आगे कॉल नहीं चाहिए, तो 0 दबाइए।`;
    
    speakReadback(ivrScriptText.textContent);

    callModal.classList.remove('hidden');
    showToast(`Calling ${cust.name}...`, 'success');
  } catch (err) {
    showToast('Call error: ' + err.message, 'danger');
  }
};

// Handle DTMF Keypad Clicks in Modal
document.querySelectorAll('.dtmf-button').forEach(btn => {
  btn.addEventListener('click', async () => {
    const digit = btn.getAttribute('data-digit');
    if (!state.activeCallCustomerId) return;

    try {
      await fetch(`/voice/response?customer_id=${state.activeCallCustomerId}&Digits=${digit}&CallSid=${state.activeCallSid}`, {
        method: 'POST'
      });
      
      callModal.classList.add('hidden');
      
      let msg = '';
      if (digit === '1') msg = currentLang === 'en' ? 'Customer promised to pay by tomorrow ✅' : 'ग्राहक ने कल तक देने का वादा किया ✅';
      else if (digit === '2') msg = currentLang === 'en' ? 'Customer promised to pay in few days ⏳' : 'ग्राहक ने कुछ दिन बाद देने का वादा किया ⏳';
      else if (digit === '3') msg = currentLang === 'en' ? '⚠️ Customer said bill is wrong! Calls stopped.' : '⚠️ ग्राहक ने हिसाब गलत बताया! आगे कॉल्स बंद।';
      else if (digit === '0') msg = currentLang === 'en' ? '🚫 Customer asked not to call again.' : '🚫 ग्राहक ने कॉल बंद करने को कहा (हटा दिया गया)।';
      
      showToast(msg, digit === '3' ? 'danger' : 'success');
      speakReadback(msg);

      loadCustomers();
      loadStats();
      loadHistory();
    } catch (err) {
      showToast('Error: ' + err.message, 'danger');
    }
  });
});

btnCloseModal.addEventListener('click', () => {
  callModal.classList.add('hidden');
});

// 7. Load Khata Book History
async function loadHistory() {
  try {
    const resp = await fetch('/api/history');
    const data = await resp.json();
    renderHistory(data.entries);
  } catch (err) {
    console.error('Error loading history:', err);
  }
}

function renderHistory(entries) {
  ledgerHistoryBody.innerHTML = '';
  const dict = I18N[currentLang];

  entries.forEach(e => {
    const tr = document.createElement('tr');
    if (e.is_voided) tr.className = 'row-voided';

    const dateStr = new Date(e.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    tr.innerHTML = `
      <td style="font-family:'Geist Mono', monospace; font-size:0.75rem; color:hsl(var(--muted-foreground));">${dateStr}</td>
      <td><strong>${e.customer_name}</strong></td>
      <td class="type-tag-${e.type}">${e.type === 'credit' ? dict.creditText : dict.paymentText}</td>
      <td>${e.qty ? e.qty + ' ' : ''}${e.item || '-'}</td>
      <td style="font-family:'Geist Mono', monospace;"><strong>₹${e.amount}</strong></td>
      <td>
        ${e.is_voided 
          ? `<span class="badge badge-dispute">${currentLang === 'en' ? 'Cancelled' : 'रद्द'}</span>` 
          : `<span class="badge badge-clean">${currentLang === 'en' ? 'Saved' : 'दर्ज'}</span> 
             <button class="btn-icon" title="Cancel this mistake entry" onclick="cancelEntry(${e.id})" style="font-size:0.75rem; margin-left:0.5rem; color:#EF4444;">✕ Cancel</button>`
        }
      </td>
    `;
    ledgerHistoryBody.appendChild(tr);
  });
}

// Cancel / Void a mistaken entry
window.cancelEntry = async function(entryId) {
  if (confirm(currentLang === 'en' ? 'Cancel this entry? Balance will adjust automatically.' : 'क्या आप यह गलत एंट्री रद्द करना चाहते हैं?')) {
    try {
      const resp = await fetch(`/api/entries/${entryId}/void`, { method: 'POST' });
      const data = await resp.json();
      if (data.success) {
        showToast(currentLang === 'en' ? 'Entry cancelled. Khata updated.' : 'एंट्री रद्द कर दी गई।', 'warning');
        loadCustomers();
        loadHistory();
        loadStats();
      }
    } catch (err) {
      showToast('Error: ' + err.message, 'danger');
    }
  }
};

// 8. Stats & Polling
async function loadStats() {
  try {
    const resp = await fetch('/api/stats');
    const data = await resp.json();

    statTotalUdhaar.textContent = `₹${data.total_udhaar.toLocaleString('en-IN')}`;
    statDebtors.textContent = data.active_debtors;
    statPromised.textContent = data.counts.promised;
    statDisputed.textContent = data.counts.disputed;

    if (data.recent_logs && data.recent_logs.length > 0) {
      const topLog = data.recent_logs[0];
      if (topLog.id > state.lastProcessedLogId) {
        if (state.lastProcessedLogId !== 0) {
          if (topLog.status === 'promised') {
            showToast(currentLang === 'en' ? `${topLog.customer_name} promised to pay by tomorrow ✅` : `${topLog.customer_name} ने कल तक वादा किया ✅`, 'success');
          } else if (topLog.status === 'disputed') {
            showToast(currentLang === 'en' ? `⚠️ ${topLog.customer_name} reported wrong bill!` : `⚠️ ${topLog.customer_name} ने हिसाब गलत बताया!`, 'danger');
          } else if (topLog.status === 'opted_out') {
            showToast(currentLang === 'en' ? `🚫 ${topLog.customer_name} asked to stop calls.` : `🚫 ${topLog.customer_name} ने कॉल बंद करने को कहा।`, 'warning');
          }
        }
        state.lastProcessedLogId = topLog.id;
      }
    }

    renderChart(data.weekly_chart);
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
}

function renderChart(weeklyData) {
  if (!weeklyData || !window.Chart) return;
  const ctx = document.getElementById('weeklyChart').getContext('2d');

  const dayLabels = currentLang === 'en' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today']
    : ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'आज'];

  const udhaarData = weeklyData.map(d => d.udhaar);
  const vasooliData = weeklyData.map(d => d.vasooli);

  if (weeklyChartInstance) {
    weeklyChartInstance.data.labels = dayLabels;
    weeklyChartInstance.data.datasets[0].label = currentLang === 'en' ? 'Udhaar Given' : 'उधार दिया';
    weeklyChartInstance.data.datasets[1].label = currentLang === 'en' ? 'Money Collected' : 'पैसा मिला (वसूली)';
    weeklyChartInstance.data.datasets[0].data = udhaarData;
    weeklyChartInstance.data.datasets[1].data = vasooliData;
    weeklyChartInstance.update();
  } else {
    weeklyChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dayLabels,
        datasets: [
          {
            label: currentLang === 'en' ? 'Udhaar Given' : 'उधार दिया',
            data: udhaarData,
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderRadius: 4
          },
          {
            label: currentLang === 'en' ? 'Money Collected' : 'पैसा मिला (वसूली)',
            data: vasooliData,
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#9CA3AF', font: { family: 'Geist' } }
          }
        },
        scales: {
          x: { ticks: { color: '#9CA3AF', font: { family: 'Geist' } }, grid: { display: false } },
          y: { ticks: { color: '#9CA3AF', font: { family: 'Geist Mono' } }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }
}

// 9. Demo Seed Reset Button
btnResetSeed.addEventListener('click', async () => {
  const confirmMsg = currentLang === 'en' 
    ? 'Reset sample shop data? (Mohan & Sunita accounts will reset)'
    : 'क्या आप सैंपल दुकान डेटा रीसेट करना चाहते हैं?';

  if (confirm(confirmMsg)) {
    try {
      const resp = await fetch('/api/reset', { method: 'POST' });
      const data = await resp.json();
      showToast(currentLang === 'en' ? 'Shop data restored to initial state.' : data.message, 'success');
      state.lastCustomerId = null;
      loadCustomers();
      loadStats();
      loadHistory();
    } catch (err) {
      showToast('Error: ' + err.message, 'danger');
    }
  }
});

// Initial boot
setLanguage('en');
loadCustomers();
loadHistory();
loadStats();
setInterval(() => {
  loadStats();
}, 1500);
