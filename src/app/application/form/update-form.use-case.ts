import { FieldConfigModel, FormModel, FormRepository, SubmissionRepository } from '@app/domain';
import { getValidatorConfigError } from '@app/domain/form/validation/validator-config-validation';

export class UpdateFormUseCase {
    constructor(
        private formRepository: FormRepository,
        private submissionRepository: SubmissionRepository
    ) {}

    async execute(formId: string, changes: Omit<Partial<FormModel>, 'status'>): Promise<FormModel> {
        const submissions = await this.submissionRepository.getSubmissionsByFormId(formId);
        if (submissions.length > 0) {
            throw new Error('Form is locked: cannot be edited after receiving submissions. Clone it instead.');
        }

        // The designer passes the whole form; status is stripped at runtime because the type alone
        // cannot stop a FormModel object carrying it. Status changes go through Publish/UnpublishFormUseCase.
        const { status: _status, ...structuralChanges } = changes as Partial<FormModel>;

        const changedFields: FieldConfigModel[] = structuralChanges.pages?.flatMap((page) => page.fields) || [];
        const allValidators = changedFields.flatMap((field) => field.validators);
        allValidators.forEach((validator) => {
            const error = getValidatorConfigError(validator.type, validator.value);
            if (error) {
                throw new Error(error);
            }
        });

        return this.formRepository.updateForm(formId, structuralChanges);
    }
}
