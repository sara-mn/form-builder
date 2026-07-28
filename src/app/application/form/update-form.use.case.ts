import { FormModel, FormRepository, SubmissionRepository } from '@app/domain';

export class UpdateFormUseCase {
    constructor(
        private formRepository: FormRepository,
        private submissionRepository: SubmissionRepository
    ) {}

    async execute(formId: string, changes: Partial<FormModel>): Promise<FormModel> {
        const submissions = await this.submissionRepository.getSubmissionsByFormId(formId);
        if (submissions.length > 0) {
            throw new Error('Form is locked: cannot be edited after receiving submissions. Clone it instead.');
        }
        return this.formRepository.updateForm(formId, changes);
    }
}
