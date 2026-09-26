# Form Builder

A form-building application built with Angular 22 (Zoneless, Signals) and PrimeNG v22, structured around Clean Architecture and Domain-Driven Design. Admins design multi-page forms with field-level and cross-field validation rules; viewers fill and submit them. Built as a portfolio project targeting the German frontend job market — every architectural decision below is deliberate and documented as a trade-off, not a default.

**Live demo**: https://sara-mn.github.io/form-builder — frontend on GitHub Pages, backend on Render (free tier). Login and API calls work end-to-end. A few honest caveats:

- **Access from Iran**: Render's free tier is unreachable from Iranian IP ranges (a sanctions-related restriction on the hosting side, not this app). The demo works normally from elsewhere; a VPN is needed to test it from Iran.
- **Data resets**: the backend runs on an ephemeral filesystem — any registrations, profile edits, or password changes are lost whenever the service restarts or spins down from inactivity. The seeded accounts below always work regardless.
- **Cold start**: the free-tier backend sleeps after ~15 minutes of inactivity; the first request afterward can take 30–50 seconds to wake it.
- **Cross-site cookies**: browsers that block third-party cookies by default (e.g. Safari) may reject the cross-origin refresh-token cookie even when the server is configured correctly — this is a browser-level restriction on GitHub Pages ↔ Render specifically, not something server config can work around.

## Architecture

The codebase is organized into four layers, with dependencies pointing strictly inward:

```
Presentation → Application → Domain
                    ↑
              Infrastructure
```

```
src/app/
├── domain/            Pure TypeScript. Zero Angular imports, zero I/O.
│                       Models, business rules, and abstract ports
│                       (*Gateway for technical ports, *Repository for
│                       data-access ports).
├── application/        Use Cases. Promise-based orchestration of Domain
│                       Services against the abstract ports. Still
│                       framework-agnostic.
├── infrastructure/     *ApiAdapter classes implement the Domain's
│                       abstract ports, converting HTTP Observables to
│                       Promises via firstValueFrom.
└── presentation/       Angular. Facades (signal-based) expose Application
                        use cases to components. Routed components live at
                        each feature's root; presentational children live
                        under components/; orchestration lives under
                        services/.
```

Why split Domain and Application from Angular entirely: the business rules — what makes a form valid, when a form locks, how cloning regenerates IDs — don't depend on any UI framework. Keeping them framework-agnostic means they're portable and testable without a TestBed, and it forces a real boundary between "what the business needs" and "how Angular happens to render it."

## Business rules

- **Lock rule:** a form is editable until it receives its first submission; after that, its structure and metadata are frozen. Enforced server-side in `UpdateFormUseCase`, not just hidden in the UI.
- **Clone-to-edit:** cloning a locked form produces a new Draft with fresh IDs on every page, field, and validator — except field name values, which are left untouched since they're semantic identifiers, not technical ones.
- **One submission per user per form:** enforced as a pre-check in `SubmitFormUseCase`, not as a database constraint.
- **Cascade-delete:** removing a field also strips any cross-field validator (on any page) that referenced it via `targetFieldId` or `dependsOnFieldId`, so validators never point at a field that no longer exists.

## Validation engine

Field-level and cross-field validation rules live in `domain/form/validation/` as pure functions, dispatched through `Record<EnumType, fn>` lookup tables instead of switch statements — this gives compile-time exhaustiveness checking; adding a new validator type without handling it in every dispatch table fails to compile. `FormValidationService` (a Domain Service, not a Use Case) validates a whole form against submitted answers and is the authoritative check inside `SubmitFormUseCase`. Presentation-layer adapters bridge these same pure rules into Angular's `ValidatorFn` for real-time feedback in the form-renderer, so the validation logic is written once and used both live in the browser and as the server-side source of truth.

**Known scope limit:** real-time cross-page validation isn't wired into the renderer, since a page's `FormGroup` can't see other pages' controls. `SubmitFormUseCase` remains the authoritative check for those rules at submit time.

## Tech stack

| | |
|---|---|
| **Framework** | Angular 22 — standalone components, Zoneless change detection, Signals, `@Service()` + `inject()` |
| **UI** | PrimeNG v22 (Aura theme) + Tailwind v4 via `tailwindcss-primeui` |
| **Forms** | Reactive Forms (form-renderer, to integrate with the custom validation engine); plain signal-bound inputs elsewhere |
| **Testing** | Vitest + `@angular/build:unit-test`, happy-dom, Playwright Chromium |
| **Backend** | Custom Express server (ESM) for JWT auth (`jsonwebtoken`, `bcryptjs`, httpOnly refresh cookie) + `json-server` for CRUD |

## Getting started

### Prerequisites

- Node.js (LTS)
- Angular CLI

### Install

```bash
git clone https://github.com/sara-mn/form-builder.git
cd form-builder
npm install
```

### Configure the backend

The mock API server needs two JWT secrets. Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

### Run

Two processes run side by side in development — the Angular dev server and the mock API:

```bash
npm run mock-server   # Express + json-server, http://localhost:3000
npm start              # Angular dev server, http://localhost:4200
```

Seeded accounts:

| Email | Password | Role |
|---|---|---|
| admin@example.com | admin123 | Admin |
| user@example.com | user123 | Viewer |

### Test

```bash
npm test
```

### Build

```bash
npm run build-prod
```

## Deployment

- **Frontend**: GitHub Pages, via `npm run deploy-gh` (wraps `angular-cli-ghpages`). Production builds (`npm run build-prod`) resolve the API URL from `src/environments/environment.production.ts`, wired in via `angular.json`'s `production` `fileReplacements`.
- **Backend**: Render (Node web service). Required environment variables, set in Render's dashboard (never committed):

| Variable | Purpose |
|---|---|
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | JWT signing secrets |
| `FRONTEND_URL` | Builds the password-reset link logged server-side; must include the `/form-builder` base path |
| `NODE_ENV=production` | Switches the refresh-token cookie to `sameSite: 'none'; secure: true` — required for it to survive a cross-site request between GitHub Pages and Render. Without it, the browser silently drops the cookie and session restore fails. |

Worth noting for anyone reproducing this setup: this project's backend runtime dependencies (`express`, `cors`, `cookie-parser`, `json-server`, `jsonwebtoken`, `bcryptjs`, `dotenv`) were originally listed under `devDependencies`. `npm install` skips `devDependencies` when `NODE_ENV=production`, which broke the first deploy with `Cannot find package 'dotenv'` — they're now correctly under `dependencies`.

## Project status

Actively developed in phases, each scoped and closed before the next begins:

- ✅ JWT + RBAC authentication
- ✅ Standalone shell, Tailwind styling, dark mode
- ✅ Form persistence, multi-page domain model, validation engine
- ✅ Full test coverage across all layers — domain, application, infrastructure, and every presentation-layer component/facade (93 spec files, ~700 tests)
- ✅ Architecture cleanup, accessibility fixes, visual pass, dashboard
- ✅ Account management: profile editing, change password, forgot/reset password
- ✅ Backend deployed to Render, frontend to GitHub Pages, authenticated end-to-end across origins
- ⬜ `npm audit` review (moderate/high advisories flagged, not yet triaged)
- ⬜ `allowScripts` allowlist update for bumped `lmdb`/`esbuild` versions

## Timeline

Initial version built in 2024. Development paused for several months while I focused on an intensive German language program (B2, TELC — achieved May 2026) and a job search process. Resumed mid-2026 with a substantial rework: migration to Angular 22 (Zoneless, Signals), the Clean Architecture restructure described above, and the test suite. Actively developed since.

## Development notes

This project was built as a solo learning/portfolio effort, with Claude used as a development aid alongside manual coding:

- **Claude.ai** for architecture review, working through design trade-offs (e.g. domain modeling, layer boundaries, naming conventions), and code suggestions.
- **Claude Code** (terminal) for diagnostics and verification only — inspecting files, running builds/tests, and reporting output back for review.
- All file edits were applied manually; every suggested change was reviewed, and often adjusted, before being committed.

Architectural decisions, trade-offs, and the final code are my own — Claude was a tool in the process, not the author of the design.

## License

MIT