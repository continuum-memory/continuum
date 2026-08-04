<div align="center">

<img src="public/favicon.svg" alt="FrugalHQ Logo" width="64" height="64" />

# FrugalHQ

**Local-first envelope budgeting. Spend only what you have.**

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![CI](https://img.shields.io/github/actions/workflow/status/FrugalHQ/frugalhq/ci.yml?style=flat-square&label=CI)](https://github.com/FrugalHQ/frugalhq/actions)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-ff69b4?style=flat-square)](https://github.com/FrugalHQ/frugalhq)

[**Live Demo →**](https://frugalhq.github.io/frugalhq) &nbsp;·&nbsp; [Report Bug](https://github.com/FrugalHQ/frugalhq/issues) &nbsp;·&nbsp; [Request Feature](https://github.com/FrugalHQ/frugalhq/issues)

</div>

---

## What is envelope budgeting?

> *You only spend money you actually have — not money you're hoping shows up next payday.*

The envelope method divides your income into named "envelopes" (categories). When an envelope is empty, spending stops. No debt spirals, no overdrafts, no math at the end of the month wondering where it all went.

FrugalHQ is the fastest way to do this on your device — no account required, no server, no sync unless you want it.

---

## Features

- 📦 **Envelope budgeting** — create categories, fill them from your income, spend from them
- 💾 **Local-first** — your data lives in your browser. Nothing is sent to a server
- ⚡ **Instant** — no loading spinners, no round-trips, everything is local
- 📱 **PWA** — install it on your phone like a native app
- 🌙 **Dark mode** — easy on the eyes, always on
- 📤 **Export / Import** — JSON backup and restore anytime
- 🔒 **Zero tracking** — no analytics, no ads, no accounts
- 🆓 **Free forever** — open source, MIT license

---

## Screenshots

> *The app uses a dark, emerald-accented UI designed for clarity and speed.*

### Dashboard — envelope overview

```
┌─────────────────────────────────────────────────────────┐
│  🌿 FrugalHQ        $1,240 ready to assign   Aug 2026  │
├─────────────────────────────────────────────────────────┤
│  Income $3,200  │  Budgeted $2,850  │  In envelopes $1,240 │
│─────────────────────────────────────────────────────────│
│  🏠 Housing         $1,200 / $1,500  ████████░░  80%   │
│  🍽️  Groceries        $120 / $400   ███░░░░░░░  30%   │
│  🚗 Transport          $90 / $200   ████░░░░░░  45%   │
│  ❤️  Health            $0  / $150   ░░░░░░░░░░   0%   │
│  🐷 Savings           $500 / $500   ██████████ 100% ✓ │
│  🎵 Entertainment      $60 / $100   ██████░░░░  60%   │
└─────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Requirements

- Node.js 18+ (or 20 LTS recommended)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/FrugalHQ/frugalhq.git
cd frugalhq

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

The `dist/` folder is a fully static site — host it anywhere.

---

## How it works

```
Your income → Ready to Assign → Fill Envelopes → Record Expenses
```

1. **Add income** — your paycheck hits Ready to Assign
2. **Fill envelopes** — drag money from Ready to Assign into each category
3. **Spend** — record expenses against the matching envelope
4. **Stay honest** — if an envelope hits $0, you stop spending in that category (or move money from another one)

No credit, no "I'll pay it back next month." Only real money.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Animation | Framer Motion |
| Charts | Recharts |
| Storage | `localStorage` (IndexedDB upgrade planned) |
| PWA | `vite-plugin-pwa` |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Project Structure

```
frugalhq/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── EnvelopeCard   # Individual envelope display + actions
│   │   ├── Modal          # Base modal with animation
│   │   ├── IncomeModal    # Add income flow
│   │   ├── FillModal      # Fill envelope from balance
│   │   └── SpendModal     # Record an expense
│   ├── pages/             # Route-level pages
│   │   ├── Dashboard      # Main envelope overview
│   │   ├── Transactions   # Full transaction history
│   │   └── Settings       # Export / import / reset
│   ├── hooks/
│   │   └── useAppState    # Single state + persistence hook
│   ├── lib/
│   │   ├── storage        # All state mutations (pure functions)
│   │   └── utils          # Formatting, helpers, color maps
│   └── types.ts           # Shared TypeScript types
├── public/
├── .github/workflows/     # CI + GitHub Pages deploy
└── ...config files
```

---

## Roadmap

- [ ] Multi-currency support
- [ ] Monthly rollover (carry leftover into next month)
- [ ] Spending charts & trends
- [ ] IndexedDB storage (larger datasets)
- [ ] Optional cloud sync (self-hosted)
- [ ] Recurring transactions
- [ ] Budget templates (rent-heavy, freelancer, student)

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.

**Quick start for contributors:**

```bash
git clone https://github.com/FrugalHQ/frugalhq.git
cd frugalhq
npm install
npm run dev
```

Before submitting: `npm run type-check` must pass.

---

## Philosophy

FrugalHQ is built around three hard rules:

1. **Local-first** — your financial data never leaves your device unless you explicitly export it
2. **No subscription** — always free, always open source
3. **Simplicity** — the envelope method doesn't need complexity; we keep the app small and fast

---

## License

[MIT](LICENSE) © 2026 FrugalHQ Contributors

---

<div align="center">

Built with focus. No VC funding, no growth hacks, no dark patterns.

**[⭐ Star this repo](https://github.com/FrugalHQ/frugalhq)** if FrugalHQ helps you stay on budget.

</div>
