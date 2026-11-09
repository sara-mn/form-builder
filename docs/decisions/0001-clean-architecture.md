# 0001. Clean Architecture with a framework-free core

- Status: Accepted
- Date: 2026-11-09 (records a decision made in Phase 4)

## Context
The app has non-trivial business rules: a validation engine with field and cross-field
validators, form locking, publishing rules and role-based permissions.
In a typical Angular structure these rules end up inside components and services that
depend on `HttpClient`, RxJS and Angular DI. Testing them then needs `TestBed`, and a change
in the backend or in the framework touches business logic.

## Decision
Split the frontend into four layers with dependencies pointing inward:
domain ← application ← presentation, and infrastructure → domain.

- `domain/` and `application/` are plain TypeScript: no Angular, RxJS or HTTP imports.
- The domain defines ports (`*Repository`, `*Gateway`); `infrastructure/` implements them
  as `*Adapter` classes.
- Each user action is one use case class in `application/`.
- Presentation reaches use cases through facades.

## Alternatives considered
- **Standard Angular structure** (feature folders, services calling `HttpClient` directly) –
  less code, but business rules become coupled to Angular and RxJS and need `TestBed` to test.
- **NgRx-centered architecture** – solves state management, not the separation of business
  rules from the framework; adds boilerplate without that benefit.

## Consequences
Easier:
- Domain rules and use cases are tested as plain classes – fast, no `TestBed`.
- The backend can change without touching business logic: the API rewrite in Phase 9
  slice 3 needed no change in the domain or the use cases.
- New features often touch one layer only: the submissions viewer (Phase 7) reused
  existing use cases and adapters and only added presentation code.
- The core does not depend on Angular, so a framework change would not rewrite it.

Harder:
- More files per feature: a port, an adapter and one use case per action.
- A boundary conversion is needed: adapters turn `Observable` into `Promise`
  (see ADR 0002).
- Developers used to a typical Angular structure need time to learn where code belongs.