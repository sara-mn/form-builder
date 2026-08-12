import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlreadySubmittedBanner } from './components/already-submitted-banner/already-submitted-banner';
import { DynamicField } from './components/dynamic-field/dynamic-field';
import { Guid } from '@app/domain';
import { FormRendererFacade } from './services/form-renderer.facade';
import { DynamicFormBuilderService } from './services/dynamic-form-builder.service';

@Component({
    selector: 'app-form-renderer',
    imports: [ReactiveFormsModule, ButtonModule, StepperModule, AlreadySubmittedBanner, DynamicField],
    templateUrl: './form-renderer.html',
    styleUrl: './form-renderer.scss'
})
export class FormRenderer {
    id = input.required<Guid>();

    private facade = inject(FormRendererFacade);
    private formBuilder = inject(DynamicFormBuilderService);

    form = this.facade.form;
    alreadySubmitted = this.facade.alreadySubmitted;

    pageGroups = signal<FormGroup[]>([]);
    activeStep = signal<number>(1);
    isSubmitting = signal<boolean>(false);
    submitError = signal<string | null>(null);

    isLastStep = computed(() => this.activeStep() === this.pageGroups().length);

    constructor() {
        effect(() => {
            const formId = this.id();
            if (formId) {
                this.facade.loadForm(formId).then(() => {
                    const form = this.form();
                    if (form) {
                        this.pageGroups.set(this.formBuilder.buildPageGroups(form));
                    }
                });
            }
        });
    }

    goToStep(step: number, activateCallback: (step: number) => void): void {
        const currentGroup = this.pageGroups()[this.activeStep() - 1];
        currentGroup?.markAllAsTouched();

        if (step > this.activeStep() && currentGroup?.invalid) {
            return;
        }

        this.activeStep.set(step);
        activateCallback(step);
    }

    async onSubmit(): Promise<void> {
        const groups = this.pageGroups();
        groups.forEach((g) => g.markAllAsTouched());

        if (groups.some((g) => g.invalid)) {
            this.submitError.set('Please fix the errors before submitting.');
            return;
        }

        const answers: Record<string, unknown> = {};
        for (const group of groups) {
            Object.assign(answers, group.getRawValue());
        }

        this.isSubmitting.set(true);
        this.submitError.set(null);
        try {
            await this.facade.submitForm(answers);
        } catch (err) {
            this.submitError.set(err instanceof Error ? err.message : 'Submission failed.');
        } finally {
            this.isSubmitting.set(false);
        }
    }
}
