<div align="center">

# 🛒 UdhaarBuddy

### _The Kirana Ledger That Listens_

**Voice-first Digital Khata for small grocery shops**  
_AI-powered credit ledger with automated, consent-gated recovery calls_

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-WAL-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-111827?style=for-the-badge)](LICENSE)
[![Built At](https://img.shields.io/badge/Built-Vibe%20Coding%20Event%202026-8E45F0?style=for-the-badge)](https://github.com/ajayXcode/kirana-stores)

---

</div>

> _"Ek mic. Ek sentence. Ek call."_  
> The shop owner says **"Mohan ne 500 ka udhaar liya"** → the ledger saves it → a polite automated call goes out → the customer presses **1** → the dashboard updates in real time.  
> No forms. No app downloads. Just voice, trust, and technology that speaks the owner's language.

---

## Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
- [AI & Architecture](#ai--architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Demo Flow](#demo-flow)
- [API Reference](#api-reference)
- [Data Safety & Ethics](#data-safety--ethics)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)

---

## The Problem

India's 15 million kirana shops run on trust and memory. The owner keeps a rough notebook — "Mohan ne 500 rupaye liye, kal Dena padega" — but notebooks get lost, entries are forgotten, and asking for money back is awkward and personal.

| Current Reality | The Cost |
|---|---|
| Paper ledger gets misplaced or wet | 💰 Money disappears down the drain |
| Owner remembers "Mohan owed something" but not the exact amount | 🤯 Trust erodes over disputes |
| Calling customers to remind feels uncomfortable and pushy | 😣 Relationships suffer |
| Digital apps require English and complex forms | 🙅 Owners simply give up |

---

## Our Solution

**UdhaarBuddy** replaces the paper ledger with a voice-first digital khata that understands **Hinglish** — the mix of Hindi and English that real kirana owners speak.

<div align="center">

```
Owner speaks:  "Mohan ne 500 ka udhaar liya"
                     │
                     ▼
       ┌───────────────────────────┐
       │   Hinglish NLU Parser     │
       │  {customer: Mohan,         │
       │   type: credit,            │
       │   amount: 500}             │
       └───────────────────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │  Immutable Ledger (SQLite) │
       └───────────────────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │  Automated IVR Call  📞   │
       │  "1 = Kal tak denge"       │
       │  "2 = Kuchh din baad"      │
       │  "3 = Yeh hisaab galat"    │
       │  "0 = Aage mat bulana"     │
       └───────────────────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │  Live Dashboard ✨         │
       │  "Mohan ne kal tak vaada   │
       │   kiya ✅"                  │
       └───────────────────────────┘
```

</div>

---

## Key Features

### 🎤 One-Sentence Entry
Speak or type naturally in Hinglish. No forms, no dropdowns.

> _"Mohan ne 3 kilo atta paanch sau ka udhaar liya"*  
> → Entry saved in 3 seconds.

- **Voice capture** via Web Speech API (`hi-IN`)
- **Type mode** fallback for noisy environments
- **Context memory**: "uska 200 jama ho gaya" auto-links to the last customer
- **Sample buttons** for instant demo — no typing needed

### 🤔 Confidence Before Commit
Never silently guesses. When unsure:

> *"Kitna Poocha? ₹200 ya ₹500?"* — large buttons for the owner to tap.

### 📊 Immutable Ledger
Every entry is a permanent record:

- Corrections create **new rows** (`amends_id`) — originals are voided, never deleted
- Balances = `sum(credit) − sum(payment)` — always accurate, always auditable
- Full history with timestamps and raw text preserved

### 📞 Consent-Gated Recovery Calls
Polite, automated calls that respect the customer:

| Press | Meaning | Result |
|-------|---------|--------|
| **1** | "Will pay tomorrow" | ✅ Promised — dashboard updated |
| **2** | "Will pay in a few days" | ⏳ Promised later — dashboard updated |
| **3** | "This isn't my bill" | ⚠️ Disputed — **calls stopped immediately** |
| **0** | "Don't call me again" | 🚫 Opt-out — **permanently unsubscribed** |

**Pre-call guardrails** — every call is blocked unless:
- ✅ Customer consent = YES
- ✅ Not opted out
- ✅ No active dispute
- ✅ Balance > ₹0

### 📈 Live Dashboard
1.5-second live polling with toast notifications:

> _"Sunita ne kuch din baad dene ka vaada kiya"_ 💬

Charts, KPIs, call logs, and customer cards — all updating in real time.

### 🧪 Demo Ready
No signup. No API keys. Just run and go:

- **Demo login:** `9876543210` / `1234` (Ramesh Kirana Store)
- Seeded customers: Mohan (₹500), Sunita (₹150)
- Interactive IVR call simulator — press 1/2/3/0 right in the browser
- One-click reset button to restore demo data

---

## AI & Architecture

### Hinglish NLU Parser (`parser.js`)

The parser is **rule-based** — no cloud LLM required for core functionality. It handles:

| Capability | Examples |
|------------|----------|
| Hindi number words | `paanch sau` → 500, `dedh sau` → 150, `ek hazaar` → 1000 |
| Devanagari digits | `५००` → 500, `दो सौ` → 200 |
| Mixed language entities | `Mohan` / `मोहन` — customer, item, amount |
| Quantity + item extraction | `3 kilo atta`, `2 packet chai` |
| Context memory | `uska 200` → last active customer |
| Garbage detection | `asdf qwer` → "Dobara boliye" |

**Optional stretch**: An LLM JSON fallback can be wired in for sentences the rule engine cannot resolve — the parser returns clarification candidates instead of guessing.

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                Browser (Chrome)                         │
│                                                            │
│  🎙️ Web Speech API    │  📊 Chart.js    │  🔊 TTS     │
│  (hi-IN, type mode)   │  Live Polling   │  (hi-IN)    │
└──────────┬─────────────────────────────────┘
           │
           │  GET/POST /api/*  (JSON over HTTP)
           │
┌──────────▼─────────────────────────────────┐
│                Express Server              │
│                                              │
│  /api/parse  →  parser.js (NLU)            │
│  /api/entries → db.js (SQLite WAL)         │
│  /api/reminders/call → Twilio Voice API    │
│  /voice/answer → TwiML Generator           │
│  /voice/response → DTMF Outcome Handler    │
│  /api/stats → Aggregated Metrics           │
└──────────┬─────────────────────────────────┘
           │
           │  SQL
           ▼
┌─────────────────────────────────────────────────────────┐
│                SQLite (file-based, WAL mode)            │
│  • users • customers • ledger_entries • call_logs       │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Plain HTML5 + CSS3 (custom properties) + vanilla JavaScript |
| **Charts** | [Chart.js](https://www.chartjs.org/) |
| **Voice Input** | Web Speech API (`hi-IN` locale) |
| **Voice Output** | Web Speech API (`speechSynthesis`, `hi-IN`) |
| **NLU** | Custom rule-based parser (`parser.js`) |
| **Backend** | Node.js 20+ + Express 4.x |
| **Database** | SQLite 3 (via `node:sqlite`, WAL mode) |
| **SMS/Voice** | Twilio Programmable Voice + TwiML |
| **Live Sync** | Server-side polling (1.5s) |
| **Styling** | CSS custom properties, gradient text, glassmorphism cards |

> **Why no React/Vue?** Kirana owners use old Android phones. A single `node server.js` with plain HTML runs anywhere, loads instantly, and requires zero build step.

---

## Quick Start

### Prerequisites
- Node.js v20+ (uses built-in `node:sqlite` module)
- No API keys required for demo mode

### One-Command Run

```bash
# Clone
git clone https://github.com/ajayXcode/kirana-stores.git
cd kirana-stores

# Install
npm install

# (Optional) Set up environment
cp .env.example .env
# Edit .env: add TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN if using real calls

# Run parser tests
node test_parser.js

# Start the app
npm start
# or: node server.js
```

Open **[http://localhost:3000](http://localhost:3000)** → you're on the landing page.

> **Demo credentials:** Phone `9876543210`, Password `1234`

---

## Demo Flow (3.5 minutes)

### 🪙 Scenario 1: Record Credit & Recover

1. **Speak:** _"Mohan ne 3 kilo atta paanch sau ka udhaar liya"_
2. **Confirm card** slides up with parsed details
3. **Tap** ✓ → browser reads back: _"Mohan ka paanch sau rupaye ka udhaar likh diya"_
4. Balance: ₹500. Click **📞 Call** button.
5. IVR modal opens — press **1** on the phone keypad.
6. Dashboard toast: _"Mohan ne kal tak vaada kiya ✅"_

### 💰 Scenario 2: Payment Received

1. **Speak:** _"uska 200 jama ho gaya"_ (context memory auto-links to Mohan)
2. Balance drops to ₹300
3. Confirm + save

### ⚠️ Scenario 3: Dispute (The Respectful Way)

1. Click **📞 Call** for a customer
2. Customer presses **3**
3. Screen: _"DISPUTED — calls stopped for this customer"_
4. Owner gets an alert. No more calls are ever made.
5. The original ledger row is preserved for audit.

### 🔄 Reset & Replay

Click the **🔄 Reset Sample Data** button — the shop is restored to its initial state instantly.

---

## API Reference

### Authentication

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/auth/login` | `{ phone, password }` |
| POST | `/api/auth/register` | `{ shop_name, owner_name, phone, password }` |
| POST | `/api/auth/logout` | — |
| GET | `/api/auth/me` | — |

### Ledger

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/parse` | `{ text, last_customer_id? }` |
| POST | `/api/entries` | `{ customer_id, type, amount, item?, qty?, raw_text }` |
| POST | `/api/entries/:id/void` | — |
| POST | `/api/entries/amend` | `{ original_entry_id, ... }` |
| GET | `/api/history` | `?customer_id=` |

### Customers

| Method | Endpoint | Body |
|--------|----------|------|
| GET | `/api/customers` | — |
| POST | `/api/customers` | `{ name, phone? }` |
| POST | `/api/customers/:id/toggle` | `{ consent?, disputed?, phone? }` |

### Calls & Analytics

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/reminders/call` | `{ customer_id, phone? }` |
| GET | `/api/stats` | — |
| POST | `/api/reset` | — |

### Voice Webhooks

| Method | Endpoint | Purpose |
|--------|----------|---------|
| ANY | `/voice/answer` | TwiML response (Appendix A script) |
| ANY | `/voice/response` | DTMF outcome handler (1/2/3/0) |

---

## Data Safety & Ethics

> _"We built a harassment tool? No. We built a tool that stops harassment."_

| Principle | Implementation |
|-----------|----------------|
| **Consent First** | Customer must explicitly opt in. No calls without consent. |
| **Dispute = Stop** | Pressing 3 halts all calls immediately. Owner is alerted. |
| **Opt-Out = Forever** | Pressing 0 adds the customer to a permanent do-not-call list. |
| **Polite Script** | Fixed, non-threatening Devanagari TTS script. Never raises voice. |
| **Immutable Audit** | No data is ever deleted. Corrections create new rows. |
| **Calling Window** | Demo: hard-coded. Production: 09:00–19:00 IST, 3 attempts max. |
| **No Recording** | Call audio is never recorded. Only digits + outcome are stored. |
| **Transparent** | Script's first line always identifies the shop by name. |

---

## Project Structure

```
kirana-stores/
├── server.js                # Express server with all API + webhook routes
├── db.js                    # SQLite schema, seed data, balance calc engine
├── parser.js                # Hinglish NLU: number words, entity extraction
├── test_parser.js           # 40+ test sentences (Appendix B coverage)
├── package.json
├── .env.example             # Environment variable template
├── 10-FINAL-PRD-hackathon.md   # Full product requirements document
│
├── public/
│   ├── landing.html         # 🌊 Landing page (hero image + wavy scroll)
│   ├── login.html           # 🔐 Login / Register (auth flow)
│   ├── index.html           # 📊 Main dashboard (authenticated)
│   ├── app.js               # Frontend: voice, parsing, live polling, IVR
│   ├── style.css            # Dashboard theme & component styling
│   └── assets/
│       ├── kirana_hero.jpg      # Kirana shop reference photo
│       ├── landing_ref.png      # Landing page design reference
│       └── wave-hero.png        # Hero image with wave animation
│
└── udhar_buddy.db           # SQLite (auto-created on first run)
```

---

## Testing

```bash
# Run parser test suite
node test_parser.js
```

Covers all Appendix B sentences: Hinglish numbers, Devanagari digits, context memory, quantity+item extraction, and graceful failure on gibberish.

---

## Roadmap

| Priority | Feature |
|----------|---------|
| 🔴 Soon | Real SMS/WhatsApp consent flow before calls |
| 🟡 Later | Offline-first PWA with on-device ASR |
| 🟡 Later | UPI collect links in IVR script |
| 🟢 Later | Multi-tenant with Row-Level Security |
| 🟢 Later | Distributor credit visibility dashboard |

---

## Acknowledgements

- **Twilio** — Programmable Voice API and TwiML
- **Google Chrome** — Web Speech API (`hi-IN`) for voice recognition & synthesis
- **Node.js team** — `node:sqlite` built-in module
- **Chart.js** — Weekly recovery charts
- The millions of kirana owners who make India's retail economy run every day

---

<div align="center">

**Built with ❤️ for the Vibe Coding Event 2026 — Day 1 (29th September)**  
_Problem Statement #1: Kirana Ledger That Listens_

<a href="https://github.com/ajayXcode/kirana-stores">
  <img src="https://img.shields.io/badge/GitHub-Code%20Repository-181718?style=for-the-badge&logo=github&logoColor=white" />
</a>

_Made by Ajay Yadav_

</div>
