import { FormModel, FormRepository, FormStatusEnum, Guid } from '@app/domain';

/** Closes a form for new submissions; existing submissions are kept. */
export class UnpublishFormUseCase {
    constructor(private formRepository: FormRepository) {}

    execute(formId: Guid): Promise<FormModel> {
        return this.formRepository.updateForm(formId, { status: FormStatusEnum.Draft });
    }
}
