import { FormRepository, SubmissionRepository } from '@app/domain';

export class DeleteFormUseCase {
    constructor(
        private formRepository: FormRepository,
        private submissionRepository: SubmissionRepository
    ) {}

    async execute(formId: string): Promise<void> {
        const submissions = await this.submissionRepository.getSubmissionsByFormId(formId);
        if (submissions.length > 0) {
            throw new Error('Form is locked: cannot be deleted after receiving submissions. Clone it instead.');
        }

        await this.formRepository.deleteForm(formId);
    }
}
