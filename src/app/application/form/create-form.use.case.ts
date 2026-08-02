import { CrossFieldValidatorConfigModel, FormModel, FormPageModel, FormRepository, FormStatusEnum, Guid } from '@app/domain';

export class CreateFormUseCase {
    constructor(private formRepository: FormRepository) {}

    async execute(ownerId: Guid, title: string, description: string): Promise<FormModel> {
        const form: Omit<FormModel, 'id' | 'createdAt' | 'updatedAt'> = {
            ownerId,
            description,
            title,
            status: FormStatusEnum.Draft,
            pages: [],
            validators: []
        };
        return this.formRepository.createForm(form);
    }
}
