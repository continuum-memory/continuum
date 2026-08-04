# Contributing to FrugalHQ

Thank you for your interest in contributing! FrugalHQ is a small, focused open-source project and we welcome contributions of all kinds.

## Philosophy

FrugalHQ is built around three non-negotiables:

1. **Local-first** — user data must never leave the device unless the user explicitly exports it
2. **No subscription** — the app will always be free and open-source
3. **Simplicity** — envelope budgeting is already a proven method; we don't need to invent new features

Before opening a PR for a new feature, please open an issue first so we can align on whether it fits these principles.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/FrugalHQ/frugalhq.git
cd frugalhq

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Development

- **Tech stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **State:** Local state with `localStorage` persistence — no backend, no database
- **Routing:** React Router v6

## Pull Request Guidelines

- Keep PRs focused — one fix or feature per PR
- Write descriptive commit messages
- Ensure `npm run type-check` passes before submitting
- Add a screenshot or screen recording for UI changes

## Code Style

- TypeScript strict mode is enabled — no `any`, no unchecked types
- Components go in `src/components/` (reusable) or `src/pages/` (route-level)
- Shared logic goes in `src/lib/` or `src/hooks/`
- Use Tailwind utility classes; avoid custom CSS unless unavoidable

## Reporting Bugs

Open a [GitHub issue](https://github.com/FrugalHQ/frugalhq/issues) with:
- A clear description of the bug
- Steps to reproduce
- Your browser and OS

## License

By contributing, you agree your contributions will be licensed under the [MIT License](LICENSE).
