# AGENTS.md

## Project
Form builder SPA: design multi-page forms, publish them, collect and review submissions.
Angular 22 (standalone, zoneless, signals), PrimeNG 22 + Tailwind v4, Clean Architecture.
Backend: Express (ES modules) in `server/` with JWT auth and lowdb storage.

## Commands
- Frontend dev server: `npm start` (http://localhost:4200)
- Backend dev server: `npm run start:server` (http://localhost:3000)
- Full stack via Docker: `docker compose up --build` (http://localhost:8080)
- Client tests (Vitest, browser runner): `npx ng test --watch=false` (`npm test` runs in watch mode)
- Server tests: `npm --prefix server test`
- Lint / format: `npm run lint` / `npm run format`
- Before every commit: `npm run verify` (same checks as CI)

## Layers
- `src/app/domain/` – models, enums, ports (abstract Repository/Gateway), pure rules
- `src/app/application/` – use cases, one class per user action
- `src/app/infrastructure/` – adapters implementing the ports
- `src/app/presentation/` – facades, components, guards, routes
- `server/` – Express API, built and deployed independently

## Must-follow rules
1. `domain/` and `application/` import no Angular, RxJS or other framework code.
   Ports return `Promise`, not `Observable`; adapters convert with `lastValueFrom`.
2. Dependencies point inward: presentation → application → domain.
   Use cases never call each other.
3. Angular: standalone components, `OnPush`, `signal()` / `computed()` / `input()` / `output()` / `model()`,
   built-in control flow. Services use `@Service()` + `inject()`, not `@Injectable` or constructor injection.
4. File names have no type suffix (`dashboard.ts`). Routed component at the feature root,
   children under `components/`, facades under `services/`.
5. PrimeNG 22: named templates (`<ng-template #body>`), not `pTemplate`; `(click)`, not `(onClick)`;
   `type="button"` inside forms; static icons as `<svg data-p-icon="trash">` plus the icon component import.
6. RBAC: one permission per route (the guard requires all listed permissions).
   Actions the user may not perform are hidden, not disabled.
7. The server never trusts the client. Every rule the UI enforces is enforced again in the API
   and gets a server test. Permissions and form rules exist twice – in `src/app/domain/`
   and in `server/permissions.js` / `server/rules.js` – change both in the same commit.
8. Every new component, facade and use case gets a spec. After writing a test,
   break the code once and confirm the test fails.

## Before you start
Read `docs/status.md`.

## After you finish
Update `docs/status.md` in the same commit as the code change.