# 0003. Form as an aggregate root, submissions as a separate collection

- Status: Accepted
- Date: 2026-11-09 (records decisions made in Phases 4 and 7)

## Context
A form contains pages, pages contain fields, and fields and pages carry validators.
Cross-field validators reference other fields. A form is edited and saved as a whole
in the designer. Submissions are created by many users, can be numerous, and must be
queried by form and by user. Storage is a JSON document store without joins or transactions.

## Decision
- `FormModel` is an aggregate root (DDD): pages, fields and validators are stored
  embedded in one form document.
- Every nested item has a client-generated `id` (`crypto.randomUUID()`), so validators
  can reference fields and a clone can regenerate all ids safely.
- `FormSubmissionModel` lives in its own collection and references the form by `formId`.

## Alternatives considered
- **Normalized collections for pages and fields** – a form would need many requests to
  load and save, and a failed save could leave a half-updated form, since the store
  has no transactions.
- **Submissions embedded in the form** – the form document would grow without limit,
  every save in the designer would rewrite all answers, and anyone allowed to read a form
  would receive other respondents' data.

## Consequences
Easier:
- A form is loaded and saved in one request; a save is all or nothing.
- Cloning is a deep copy plus new ids.
- Submissions can be filtered on the server by `formId` and `submittedBy`, so a Viewer
  receives only their own.

Harder:
- The whole form is sent on every save (acceptable at this size).
- No foreign keys: integrity is enforced in code – a form with submissions cannot be
  deleted (409), and deleting a field must also remove validators that reference it.
- "Locked" needs a lookup in the submissions collection.