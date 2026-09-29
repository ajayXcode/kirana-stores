# 🎙️ UdhaarBuddy (उधार बडी)

> **"Ek mic. Ek sentence. Ek call."**  
> Kirana store owner speaks *"Mohan ne 500 ka udhaar liya"* → ledger entry created → automated consent-gated recovery call sent → customer answers with DTMF (1/2/3/0) → live dashboard updates.

Built strictly according to [10-FINAL-PRD-hackathon.md](file:///e:/udhar-buddy/10-FINAL-PRD-hackathon.md).

---

## ⚡ Features Implemented

1. **F1: One-sentence Voice/Text Entry**
   - Web Speech API (`hi-IN`) microphone capture.
   - Fallback type mode & quick demo preset buttons.
   - Context Memory: *"uska 200 jama ho gaya"* correctly attributes to the last active customer.
   - Tap-to-confirm card & browser Text-to-Speech readback (`speechSynthesis` hi-IN).

2. **F2: Confidence & Clarification**
   - Asks clarification questions when amount or customer is missing (never silently guesses).
   - Handles gibberish gracefully (*"Dobara boliye"*).

3. **F3: Customers + Derived Balance + Immutable Ledger**
   - Balance = `sum(credit) - sum(payment)`.
   - Corrections create new rows (`amends_id`) with immutable audit trail.

4. **F4: Automated Twilio Voice Calls & Guardrails**
   - Strict Pre-Call Checks: `consent = YES`, `opted_out = NO`, `disputed = NO`, `balance > 0`.
   - Appendix A Fixed Devanagari TTS script.
   - DTMF Outcomes:
     - `1`: Promised tomorrow (✅ *Mohan ne kal tak vaada kiya*)
     - `2`: Promised later (⏳ *Kuch din baad*)
     - `3`: Disputed (⚠️ *Calls immediately halted, owner alert*)
     - `0`: Opt-out (🚫 *Customer unsubscribed*)

5. **F5: Live Dashboard & Recovery Analytics**
   - 1.5s live polling with toast alerts.
   - Total udhaar, active debtors, promised counts, disputed counts.
   - Chart.js weekly recovery chart.

6. **F6: Demo Hygiene**
   - Consent toggles for testing.
   - Demo reset button (`POST /api/reset`) resetting seed data (Mohan ₹500, Sunita ₹150, Ramesh = owner).
   - In-app interactive IVR call modal simulator for judges.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run parser test suite (100% test pass on Appendix B)
node test_parser.js

# 3. Start application
npm start
```

Visit **http://localhost:3000** in your browser.
