# Status

Last updated: 2026-11-09

## Current focus
Phase 9 – features and RBAC/security completion.
Slice 4 (response access + public fill link) in progress on `feature/public-form-link`.

## Done recently
- Slice 3 – API hardening: explicit Express routers, authentication and one permission
  per route, form/submission rules enforced on the server, server tests in CI (2026-11-01)
- Slice 2 – publish / unpublish with publish precondition (2026-10-20)
- Slice 1 – RBAC completion on the client (2026-10-17)

## Next
1. Slice 4 – three response-access modes (public, public with email, logged-in only),
   public fill page, two anonymous API endpoints
2. Slice 5 – user management (list users, change role) – or defer
3. Slice 6 – wrap-up: README (shorten the architecture section and link to `docs/architecture.md`), phase summary
4. Phase 10 – E2E tests (Playwright) and accessibility checks (axe-core)

## Open questions (slice 4)
- Public URL: `/f/:formId` without a separate share token?
- Public endpoints in a separate router (`/public/forms/:id`, `/public/forms/:id/submissions`)?
- Logged-in user on the public page: optional authentication (record user id if a token is sent)?
- Forms without `responseAccess`: treat as logged-in only?

## Known issues
- Triple refresh request on page reload (no in-flight deduplication)
- "Already submitted" banner appears only after submitting, not on page load
- About 116 imports still use the old aliases (`@domain/`, `@application/`, `@features/`, …)
  instead of `@app/` (see `docs/conventions.md`); remove the unused aliases from `tsconfig.json` afterwards
- `TokenStorageService` implements `StorageGateway` but does not follow the `*Adapter` naming