# 0004. Permissions and form rules mirrored in the server

- Status: Accepted
- Date: 2026-11-09 (records a decision made in Phase 9)

## Context
The server must enforce every rule the UI enforces; a client-side check alone can be
bypassed with a direct API call. The rules already exist in the Angular domain
(TypeScript, path aliases). The server is plain JavaScript (ES modules), and its Docker
image is built from `server/` alone, so it cannot import files from `src/`.

## Decision
Keep JavaScript copies in `server/permissions.js` and `server/rules.js`. Each copy names
its Angular source in a comment. A change to a rule changes both copies in the same
commit, and every server-side rule has a server test.

## Alternatives considered
- **Shared package** (npm workspace with the domain as its own package) – one source of
  truth, but needs a TypeScript build step for the server and moves the Docker build
  context to the repository root. Too much tooling for the size of the rule set.
- **Rules only on the server** – the UI could no longer hide actions or show errors
  before a request, and would still need the permission map to render.

## Consequences
Easier:
- The server stays small, plain JavaScript and independently buildable and deployable.
- Each copy is short and readable on its own.

Harder:
- The copies can drift apart. Nothing checks automatically that they match; the
  same-commit rule and the tests on both sides are the only safeguard.
- If the rule set grows, a shared package should be reconsidered (a new ADR would
  supersede this one).