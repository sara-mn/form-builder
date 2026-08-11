import { FormModel, FormRepository, SubmissionRepository } from '@app/domain';
export interface FormListItem {
    form: FormModel;
    submissionCount: number;
}
export class GetFormsWithSubmissionCountsUseCase {
    constructor(
        private formRepository: FormRepository,
        private submissionRepository: SubmissionRepository
    ) {}

    async execute(): Promise<FormListItem[]> {
        const forms = await this.formRepository.getAllForms();
        const submissions = await this.submissionRepository.getAllSubmissions();

        return forms.map((form) => ({
            form,
            submissionCount: submissions.filter((s) => s.formId === form.id).length
        }));
    }
}
