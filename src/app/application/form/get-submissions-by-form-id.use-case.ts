import { SubmissionRepository } from '@app/domain';

export class GetSubmissionsByFormIdUseCase {
    constructor(private readonly submissionRepository: SubmissionRepository) {}

    async execute(formId: string) {
        const submissions = await this.submissionRepository.getSubmissionsByFormId(formId);
        return submissions;
    }
}
