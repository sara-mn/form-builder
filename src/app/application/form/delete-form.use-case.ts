import { FormRepository } from '@app/domain';

export class DeleteFormUseCase {
    constructor(private formRepository: FormRepository) {}

    async execute(formId: string): Promise<void> {
        await this.formRepository.deleteForm(formId);
    }
}
