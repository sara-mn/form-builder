import { FormModel, FormRepository, FormStatusEnum, FormPageModel, FieldConfigModel, Guid } from '@app/domain';

function generateId(): Guid {
    return crypto.randomUUID();
}

function cloneField(field: FieldConfigModel): FieldConfigModel {
    return {
        ...field,
        validators: field.validators.map((v) => ({ ...v, id: generateId() }))
    };
}

function clonePage(page: FormPageModel): FormPageModel {
    return {
        ...page,
        id: generateId(),
        fields: page.fields.map(cloneField),
        validators: page.validators.map((v) => ({ ...v, id: generateId() }))
    };
}

export class CloneFormUseCase {
    constructor(private formRepository: FormRepository) {}

    async execute(formId: Guid, ownerId: Guid): Promise<FormModel> {
        const original = await this.formRepository.getFormById(formId);

        const cloned: Omit<FormModel, 'id' | 'createdAt' | 'updatedAt'> = {
            title: `${original.title} (Copy)`,
            description: original.description,
            status: FormStatusEnum.Draft,
            ownerId,
            pages: original.pages.map(clonePage),
            validators: original.validators.map((v) => ({ ...v, id: generateId() })),
            clonedFromId: original.id
        };

        return this.formRepository.createForm(cloned);
    }
}
