// Mirrors of the domain rules in src/app/domain/form/rules/ (form-publishing.ts).
// The server image is built from server/ only, so it cannot import them. Change both together.

export const FormStatus = Object.freeze({ Draft: 'draft', Published: 'published' });

export function getPublishError(form) {
    const hasField = (form.pages ?? []).some((page) => (page.fields ?? []).length > 0);
    return hasField ? null : 'Add at least one field before publishing.';
}

export function isOpenForSubmissions(form) {
    return form.status === FormStatus.Published;
}
