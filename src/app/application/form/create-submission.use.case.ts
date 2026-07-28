import { FormSubmissionModel, SubmissionRepository } from '@app/domain';

export class CreateSubmissionUseCase {
    constructor(private readonly submissionRepository: SubmissionRepository) {}

    async execute(formId: string, submittedBy: string, answers: Record<string, unknown>) {
        const existing = await this.submissionRepository.getSubmission(formId, submittedBy);
        if (existing) {
            throw new Error('You have already submitted this form.');
        }
        const submissionData: Omit<FormSubmissionModel, 'id' | 'submittedAt'> = {
            formId,
            submittedBy,
            answers
        };
        const submission = await this.submissionRepository.createSubmission(submissionData);
        return submission;
    }
}
