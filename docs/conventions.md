# Conventions

## Development flow (Domain-First)
Build every non-trivial feature from the inside out:

1. Requirements pass – entities, business rules, open questions. No code until open questions are answered.
2. Domain – models, enums, ports (`*Repository`, `*Gateway`), pure rules and domain services.
3. Application – one use case per user action. Use cases may use domain services,
   never other use cases.
4. Naming, folder structure, imports, tests and git: follow `docs/conventions.md`.
5. Presentation – facade, then components (small → composite → container), then routing.
6. Server – mirror any new permission or rule in `server/` with a server test (ADR 0004).
7. Verify – `npm run verify`, a real production build (AOT catches template type errors
   that `tsc` misses), a manual end-to-end check, a dead-code check.

## Naming

| Kind | File | Class |
|------|------|-------|
| Data-access port | `form.repository.abstract.ts` | `FormRepository` |
| Technical port | `auth.gateway.abstract.ts` | `AuthGateway` |
| Adapter | `form-api.adapter.ts` | `FormApiAdapter` |
| Use case | `publish-form.use-case.ts` | `PublishFormUseCase` |
| Facade | `form-list.facade.ts` | `FormListFacade` |
| Component | `lock-banner.ts` | `LockBanner` |
| Model / enum | `form.model.ts`, `form-status.enum.ts` | `FormModel`, `FormStatusEnum` |

- Component and service files have no type suffix (Angular 2025 style guide).
  Class names keep a suffix only when it adds information (`AuthFacade`, `LoginFormCreator`).
- Routed components have no `Page` suffix (`FormList`, not `FormListPage`).

## Presentation structure
```
presentation/features/<feature>/
├── <feature>.ts          routed component
├── components/           presentational children
└── services/             facades and other orchestration
```
Cross-feature code lives in `presentation/core/` (guards, interceptors, app-wide state)
or `presentation/shared/` (reusable forms and validator utilities).

## Imports
- Leaving the current feature or folder: use `@app/` (`@app/domain`, `@app/application/...`).
- Inside the same feature or folder: use relative paths (`./`, `../`).
- Never import your own layer's barrel (a file in `domain/` must not import `@app/domain`).
- Environments: `@env/`.

## Code patterns
- Dispatch on enums with `Record<Enum, fn>` lookups instead of `switch`, so a new enum
  value is a compile error until it is handled.
- Nested form items get their `id` from `crypto.randomUUID()`.
- `Guid` is a plain alias (`type Guid = string`), for readability only.

## Testing
- Spec file next to the source file (`*.spec.ts`), Vitest with the browser runner.
- Port mocks live in `application/test-utils/`.
- See it red: after writing a test, break the code once and confirm the test fails.
- Assert a count next to `every()` – `[].every(...)` is `true`.
- `OnPush` components: change state through real setters or signals, not a spied return
  value, or the template never re-renders in the test.
- Server tests: `server/test/*.test.js` with `node:test` and `supertest`; each test runs
  on a throwaway copy of the seed (`createTestApp()`).

## Git
- Branch from `develop`: `feature/…`, `fix/…`, `docs/…`.
- Conventional commits (`feat(domain): …`, `fix: …`, `docs: …`), one logical change per commit.
  Add a body when the commit does more than the subject says.
- `npm run verify` before every commit.
- Merge into `develop` with `--no-ff`, then `develop` into `main`.

### Before merging into develop
- [ ] `npm run verify` is green
- [ ] `docs/status.md` is updated
- [ ] An ADR exists for every architectural decision in the branch
- [ ] Server or Docker changed: `docker compose down -v`, `docker compose up --build`,
      manual check with all three roles on http://localhost:8080

## Dependencies
- `@angular/*` packages are updated together with `ng update`, never with `npm audit fix`.
- Triage `npm audit` by what ships (browser bundle, deployed server) versus dev-only tooling.
- No `--force` or `--legacy-peer-deps`.