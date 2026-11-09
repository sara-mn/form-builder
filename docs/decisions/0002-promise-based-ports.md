# 0002. Promise-based ports instead of Observable

- Status: Accepted
- Date: 2026-11-09 (records a decision made in Phase 1)

## Context
ADR 0001 keeps `domain/` and `application/` free of framework code. Angular's `HttpClient`
returns `Observable`, and the usual Angular style passes it all the way up to components.
Every backend call in this app returns exactly one response; nothing is a stream.

## Decision
Ports in the domain return `Promise<T>`. Adapters in `infrastructure/` call `HttpClient`
and convert with `lastValueFrom`. Reactive UI state lives in the presentation layer
as signals in facades.

## Alternatives considered
- **Observable in ports** – idiomatic Angular, but makes RxJS a dependency of the core.
  RxJS is a library; `Promise` is part of the language.
- **Callbacks or a custom async type** – no dependency, but reinvents what `Promise`
  already provides and is harder to read than `async` / `await`.

## Consequences
Easier:
- Use cases read as plain `async` / `await` code; no subscriptions to manage or clean up.
- Use case tests need no RxJS helpers – mock a port, `await` the result.

Harder:
- A `Promise` cannot be cancelled. Leaving a page does not abort a pending request,
  and a slow older response can overwrite a newer one. If this becomes a problem,
  ports can accept an optional `AbortSignal` (a web standard, so the core stays RxJS-free).
- Streams (e.g. live updates over WebSocket) do not fit this port shape and would need
  a different abstraction if they are ever added.
- HTTP interceptors stay `Observable`-based, so the token refresh logic lives in
  infrastructure/presentation, not in a use case.