export interface FormSubmissionModel {
    id: string;
    formId: string;
    submittedBy: string;
    answers: Record<string, unknown>;
    submittedAt: string;
}
