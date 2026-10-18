import { FormModel } from '../models/form.model';

/**
 * A form can be published only when respondents have something to fill in.
 * Returns the reason publishing is not allowed, or null when it is.
 */
export function getPublishError(form: Pick<FormModel, 'pages'>): string | null {
    const hasField = form.pages.some((page) => page.fields.length > 0);
    return hasField ? null : 'Add at least one field before publishing.';
}
