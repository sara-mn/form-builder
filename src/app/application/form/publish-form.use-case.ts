import { FormModel, FormRepository, FormStatusEnum, getPublishError, Guid } from '@app/domain';

/**
 * Publishing changes only the status, so it is allowed on locked forms too:
 * the lock protects the structure, not the distribution.
 */
export class PublishFormUseCase {
    constructor(private formRepository: FormRepository) {}

    async execute(formId: Guid): Promise<FormModel> {
        const form = await this.formRepository.getFormById(formId);
        const error = getPublishError(form);
        if (error) {
            throw new Error(error);
        }
        return this.formRepository.updateForm(formId, { status: FormStatusEnum.Published });
    }
}
