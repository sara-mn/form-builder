import { Guid } from '@app/domain';
import { FormSubmissionModel } from '@app/domain/form/models/form-submission.model';

export abstract class SubmissionRepository {
    abstract getSubmission(formId: Guid, userId: Guid): Promise<FormSubmissionModel | null>;
    abstract getAllSubmissions(): Promise<FormSubmissionModel[]>;
    abstract getSubmissionsByFormId(formId: Guid): Promise<FormSubmissionModel[]>;
    abstract createSubmission(submission: Omit<FormSubmissionModel, 'id' | 'submittedAt'>): Promise<FormSubmissionModel>;
}
