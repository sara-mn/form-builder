import { SubmissionRepository } from '@app/domain';

export class GetSubmissionUseCase {
    constructor(private readonly submissionRepository: SubmissionRepository) {}

    async execute(formId: string, userId: string) {
        const submission = await this.submissionRepository.getSubmission(formId, userId);
        return submission;
    }
}
