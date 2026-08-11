import { FormRepository, FormSubmissionModel, FormValidationService, SubmissionRepository, ValidationResult } from '@app/domain';

export class SubmitFormUseCase {
    constructor(
        private submissionRepository: SubmissionRepository,
        private formRepository: FormRepository,
        private formValidationService: FormValidationService
    ) {}

    async execute(formId: string, submittedBy: string, answers: Record<string, unknown>) {
        const existing = await this.submissionRepository.getSubmission(formId, submittedBy);
        if (existing) {
            throw new Error('You have already submitted this form.');
        }

        const form = await this.formRepository.getFormById(formId);
        const validationResult: ValidationResult = this.formValidationService.validateForm(form, answers);

        if (!validationResult.isValid) {
            throw new Error(`Form validation failed: ${validationResult.errors.map((e) => e.message).join(', ')}`);
        }

        const submissionData: Omit<FormSubmissionModel, 'id' | 'submittedAt'> = {
            formId,
            submittedBy,
            answers
        };
        const submission = await this.submissionRepository.createSubmission(submissionData);
        return submission;
    }
}
