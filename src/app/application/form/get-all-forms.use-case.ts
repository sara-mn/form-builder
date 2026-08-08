import { FormModel, FormRepository } from '@app/domain';

export class GetAllFormsUseCase {
    constructor(private formRepository: FormRepository) {}

    async execute(): Promise<FormModel[]> {
        return this.formRepository.getAllForms();
    }
}
