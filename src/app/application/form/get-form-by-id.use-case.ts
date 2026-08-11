import { FormModel, FormRepository } from '@app/domain';

export class GetFormByIdUseCase {
    constructor(private formRepository: FormRepository) {}

    async execute(formId: string): Promise<FormModel> {
        return this.formRepository.getFormById(formId);
    }
}
