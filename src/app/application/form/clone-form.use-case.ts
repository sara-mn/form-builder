import { FormModel, FormRepository, FormStatusEnum, FormPageModel, FieldConfigModel, CrossFieldValidatorConfigModel, Guid } from '@app/domain';

function generateId(): Guid {
    return crypto.randomUUID();
}

interface ClonedFieldResult {
    clonedField: FieldConfigModel;
    oldId: Guid;
    newId: Guid;
}

function cloneField(field: FieldConfigModel): ClonedFieldResult {
    const newId = generateId();
    const clonedField: FieldConfigModel = {
        ...field,
        id: newId,
        validators: field.validators.map((v) => ({ ...v, id: generateId() }))
    };
    return { clonedField, oldId: field.id, newId };
}

function remapCrossFieldValidator(validator: CrossFieldValidatorConfigModel, fieldIdMap: Map<Guid, Guid>): CrossFieldValidatorConfigModel {
    return {
        ...validator,
        id: generateId(),
        targetFieldId: fieldIdMap.get(validator.targetFieldId) ?? validator.targetFieldId,
        dependsOnFieldId: fieldIdMap.get(validator.dependsOnFieldId) ?? validator.dependsOnFieldId
    };
}

function clonePage(page: FormPageModel, formLevelFieldIdMap: Map<Guid, Guid>): FormPageModel {
    const cloneResults = page.fields.map(cloneField);
    const clonedFields = cloneResults.map((r) => r.clonedField);

    const pageFieldIdMap = new Map<Guid, Guid>();
    for (const r of cloneResults) {
        pageFieldIdMap.set(r.oldId, r.newId);
        formLevelFieldIdMap.set(r.oldId, r.newId);
    }

    return {
        ...page,
        id: generateId(),
        fields: clonedFields,
        validators: page.validators.map((v) => remapCrossFieldValidator(v, pageFieldIdMap))
    };
}

export class CloneFormUseCase {
    constructor(private formRepository: FormRepository) {}

    async execute(formId: Guid, ownerId: Guid): Promise<FormModel> {
        const original = await this.formRepository.getFormById(formId);

        const formLevelFieldIdMap = new Map<Guid, Guid>();
        const clonedPages = original.pages.map((page) => clonePage(page, formLevelFieldIdMap));

        const cloned: Omit<FormModel, 'id' | 'createdAt' | 'updatedAt'> = {
            title: `${original.title} (Copy)`,
            description: original.description,
            status: FormStatusEnum.Draft,
            ownerId,
            pages: clonedPages,
            validators: original.validators.map((v) => remapCrossFieldValidator(v, formLevelFieldIdMap)),
            clonedFromId: original.id
        };

        return this.formRepository.createForm(cloned);
    }
}
