import { Guid } from '@app/domain';

export interface FormSubmissionModel {
    id: Guid;
    formId: Guid;
    submittedBy: Guid;
    answers: Record<string, unknown>;
    submittedAt: string;
}
