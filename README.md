# Kirana Ledger That Listens — UdhaarBuddy

> **# Vibe Coding Event 2026 — Day 1 (29th)**
> **Problem Statement #1:** Kirana Ledger That Listens
> **Target Persona:** Small Kirana Shop Owner

---

## Problem & Solution

**Problem:** A kirana shop owner needs to record credit (udhaar) and payments quickly — often while serving customers. They speak in mixed Hindi-English (Hinglish), will not fill out forms, and need a system that understands them and automates follow-up.

> "Mohan ne 500 ka udhaar liya" → entry saved → automated consent-gated recovery call sent → customer replies with a button → dashboard updates live.

### Constraint Addressed
The owner writes and speaks in mixed Hindi and English (Hinglish), is usually busy serving a customer, and will not fill in forms. The system must accept **one-sentence voice or text input** and turn it into a clean ledger entry automatically.

---

## Core AI Architecture

- **Model / Service:**  
  The system uses a **rule-based Hinglish NLU parser** (`parser.js`) as the primary engine — no external LLM API required for core functionality. The parser handles:
  - Hindi number words (e.g., `paanch sau` = 500, `dedh sau` = 150, `ek hazaar` = 1000)
  - Devanagari numerals and number words (e.g., `५००`, `पांच सौ`)
  - Mixed Hindi-English entity extraction (customer name, amount, item, quantity)
  - Context memory for pronouns like "uska" / "usko" / "उसका" to auto-attributing to the last active customer

  An optional **LLM fallback** (documented in PRD) can be added for sentences the rule engine cannot resolve, returning structured JSON.

- **Workflow:**  
  1. User taps mic or types a sentence in the browser (Web Speech API `hi-IN` / fallback text input)
  2. Frontend sends text to `POST /api/parse`
  3. `parseHinglishEntry()` extracts `{customer, type: credit|payment, amount, item, qty}` using regex rules + number-word mapping
  4. If ambiguous (missing customer or amount), the parser returns clarification options → user picks via large buttons
  5. On confirm, frontend `POST /api/entries` stores the immutable ledger row
  6. For recovery: `POST /api/reminders/call` triggers Twilio Programmable Voice with a fixed Devanagari TTS script
  7. Customer presses 1/2/3/0 on their phone keypad → webhook `POST /voice/response` logs the outcome
  8. Dashboard polls `GET /api/stats` every 1.5s → live toast updates

- **Error Handling:**  
  - If customer or amount cannot be determined → **clarification prompt** with candidate buttons (never silently guesses)
  - If the sentence is gibberish or unparseable → browser TTS says "Dobara boliye" (Please repeat)
  - Pre-call guardrails block calls when: consent = NO, customer opted out, dispute open, or balance ≤ 0
  - All ledger corrections create new rows (`amends_id`) with the original marked voided — **never deleted**, full audit trail preserved

---

## Features

### F1: One-Sentence Voice/Text Entry
- Chrome Web Speech API (`hi-IN`) microphone capture
- Type mode fallback (useful in noisy environments)
- Quick demo preset buttons for instant testing
- Context memory: "uska 200 jama ho gaya" attributes to last active customer (2-min idle expiry)
- Tap-to-confirm card with browser Text-to-Speech readback (`speechSynthesis` `hi-IN`)

### F2: Confidence & Clarification
- Asks clarification questions when amount or customer is missing — **never silently guesses**
- Handles gibberish gracefully (*"Dobara boliye"*)

### F3: Customers + Derived Balance + Immutable Ledger
- Balance = `sum(credit) - sum(payment)` — computed, never stored
- Corrections = **new row** (`amends_id`), original marked voided — both visible in history
- SQLite with WAL mode for performance

### F4: Automated Twilio Voice Calls & Guardrails
- **Pre-call checks (all must pass):** consent = YES, not opted out, no dispute open, balance > 0
- Fixed Devanagari TTS script (Appendix A) — no free-form AI on calls
- DTMF outcomes:
  - `1` → Promised by tomorrow ✅
  - `2` → Promised later ⏳
  - `3` → Disputed — calls immediately halted, owner alerted ⚠️
  - `0` → Opt-out — never called again 🚫

### F5: Live Dashboard & Recovery Analytics
- 1.5-second live polling with toast notifications
- Stats: total udhaar, active debtors, promised/disputed/opted-out counts
- Chart.js weekly recovery chart
- Call log history with outcome tracking

### F6: Demo Hygiene
- Consent toggle for testing
- One-click demo reset (`POST /api/reset`) — seeds Mohan (₹500), Sunita (₹150), Ramesh (owner)
- In-app interactive IVR call modal simulator (press 1/2/3/0 in-browser)
- No signup required — demo: `9876543210` / `1234`

---

## Prerequisites & Installation

### Requirements
- **Node.js** v20+ (uses `node:sqlite` built-in module)
- No external LLM API key required for demo (rule-based parser only)
- Optional: Twilio account for real phone calls (demo uses browser simulator)

### Steps

```bash
# 1. Clone repository
git clone https://github.com/ajayXcode/kirana-stores.git
cd kirana-stores

# 2. Install dependencies
npm install

# 3. Environment variables
# Copy the example env file:
cp .env.example .env

# Edit .env and add your values:
# PORT=3000                          (optional, defaults to 3000)
# SHOP_NAME="Ramesh Kirana Store"    (optional, defaults to Ramesh Kirana Store)
# TWILIO_ACCOUNT_SID=your_sid_here   (optional - demo mode works without it)
# TWILIO_AUTH_TOKEN=your_token_here  (optional - demo mode works without it)
# TWILIO_PHONE_NUMBER=+1234567890    (optional - demo mode works without it)
# APP_BASE_URL=http://localhost:3000 (optional, used for Twilio webhooks)

# 4. Run parser tests (verifies Hinglish parsing accuracy)
node test_parser.js

# 5. Start the development server
npm run dev
# or for production:
npm start

# 6. Open in your browser
# Navigate to: http://localhost:3000
```

### Quick Start (No Installation Required)
The app works out of the box with demo data:
- **Landing Page:** `http://localhost:3000`
- **Login Page:** `http://localhost:3000/login.html`
- **Demo Login:** Phone: `9876543210` | Password: `1234`

---

## Project Structure

```
kirana-stores/
├── server.js              # Express server with all API routes
├── db.js                  # SQLite schema, seed data, balance calculations
├── parser.js              # Hinglish NLU parser (rules + number-word mapping)
├── test_parser.js         # Parser test suite (Appendix B sentences)
├── package.json
├── .env.example           # Environment variable template
├── 10-FINAL-PRD-hackathon.md   # Full PRD document
├── udhar_buddy.db         # SQLite database (auto-created)
└── public/
    ├── landing.html       # Landing page with hero image & wavy scroll animation
    ├── login.html         # Login / Register page
    ├── index.html         # Main dashboard (authenticated)
    ├── app.js             # Frontend: voice, parsing, dashboard, IVR simulator
    ├── style.css          # Dashboard styling
    ├── kirana_hero.jpg    # Kirana shop hero image
    ├── landing_ref.png    # Landing page design reference
    └── wave-hero.png      # Hero image for landing page
```

### API Routes

| Method   | Endpoint                          | Description                                  |
|----------|-----------------------------------|----------------------------------------------|
| POST     | `/api/auth/login`                 | Login with phone + password                  |
| POST     | `/api/auth/register`              | Register new shop                            |
| POST     | `/api/auth/logout`                | Logout (destroy session)                     |
| GET      | `/api/auth/me`                    | Check session / get user info                |
| POST     | `/api/parse`                      | Parse Hinglish text → structured entry       |
| GET      | `/api/customers`                  | Get all customers with derived balances      |
| POST     | `/api/customers`                  | Add new customer                             |
| POST     | `/api/entries/:id/void`           | Void (cancel) a ledger entry                 |
| POST     | `/api/entries`                    | Save new ledger entry                        |
| POST     | `/api/entries/amend`              | Amend entry (void old + create new)          |
| GET      | `/api/history`                    | Get ledger history (customer-specific or all)|
| POST     | `/api/customers/:id/toggle`       | Toggle consent/disputed/phone                |
| POST     | `/api/reminders/call`             | Trigger recovery call (demo or Twilio)       |
| GET      | `/api/stats`                      | Dashboard stats + chart data                 |
| POST     | `/api/reset`                      | Reset demo data (seed data)                  |

---

## Tech Stack

| Layer        | Choice                                         |
|--------------|------------------------------------------------|
| Frontend     | Plain HTML/CSS/JS + Web Speech API + Chart.js  |
| Voice Input  | Web Speech API `hi-IN` (Chrome)                |
| Voice Output | `speechSynthesis` (browser TTS, `hi-IN`)       |
| NLU Parser   | Rule-based regex + Hindi number-word mapping   |
| Backend      | Node.js + Express                              |
| Database     | SQLite (built-in `node:sqlite`, WAL mode)      |
| Calls        | Twilio Programmable Voice + TwiML              |
| Live Updates | 1.5s polling                                   |
| Deployment   | Single `node server.js` — no build step        |

---

## Demo Story (3.5 min)

| Step | Action | Fallback |
|------|--------|----------|
| 1 | Speak "Mohan ne 3 kilo atta paanch sau ka udhaar liya" → confirm card → tap → balance ₹500 | Pre-saved sentence button |
| 2 | Speak "uska 200 jama ho gaya" (context memory) → balance ₹300 | Type mode |
| 3 | Click reminder → call modal opens → simulate DTMF | Backup video |
| 4 | Press `1` → dashboard toast "Mohan ne kal tak vaada kiya ✅" | Backup video |
| 5 | Reset → call again → press `3` → **DISPUTED badge, calls stopped** | Backup video |
| 6 | One line on consent, immutable ledger, roadmap | n/a |

---

## Responsible AI / Safety Design

| Guardrail | Demo View | Production |
|-----------|-----------|------------|
| **Consent** | Toggle "customer said YES" | SMS/WhatsApp opt-in, consent events stored |
| **Dispute path** | Digit 3 → badge + calls stopped | Dispute list, owner-customer resolution |
| **Opt-out** | Digit 0 | STOP/0 immediate, queued calls canceled |
| **Automated disclosure** | Script first line | Same + shop name |
| **Immutable ledger** | Amend = new row | Audit log, receipt hash |
| **Fixed script** | No threats/shaming | Legal-reviewed script |
| **Call limits** | Hardcoded constants | 09:00-19:00 IST, 3 attempts, 50/day/shop |
| **No recording** | Digits + outcome only | Transcript only, recording off by default |

---

## Parser Test Suite

```bash
node test_parser.js
```

Tests cover all Appendix B sentences including Hinglish number words, Devanagari digits, context memory pronouns, item+quantity extraction, and gibberish handling.

---

## Participant Info

- **Name:** Ajay Yadav
- **College ID:** [Your College ID]
- **Day:** Day 1 (29th)
- **Problem Statement:** #1 — Kirana Ledger That Listens
- **Repository:** [github.com/ajayXcode/kirana-stores](https://github.com/ajayXcode/kirana-stores)

---

## License

MIT License — built for the Vibe Coding Event 2026.
