import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { FormRenderer } from './form-renderer';
import { FormRendererFacade } from './services/form-renderer.facade';
import { DynamicFormBuilderService } from './services/dynamic-form-builder.service';
import { FormModel } from '@app/domain/form/models/form.model';
import { FormPageModel } from '@app/domain/form/models/form-page.model';
import { FieldConfigModel, FormStatusEnum } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';
import { signal } from '@angular/core';

describe('FormRenderer', () => {
    let component: FormRenderer;
    let fixture: ComponentFixture<FormRenderer>;
    let facade: Pick<FormRendererFacade, 'form' | 'alreadySubmitted' | 'loadForm' | 'submitForm'>;
    let formBuilder: Pick<DynamicFormBuilderService, 'buildPageGroups'>;

    const field1: FieldConfigModel = {
        id: 'f1',
        name: 'name',
        label: 'Name',
        type: FieldTypeEnum.Text,
        order: 0,
        validators: []
    };

    const page1: FormPageModel = { id: 'p1', title: 'Page 1', order: 0, fields: [field1], validators: [] };
    const page2: FormPageModel = { id: 'p2', title: 'Page 2', order: 1, fields: [], validators: [] };

    const mockForm: FormModel = {
        id: 'form1',
        title: 'Contact Form',
        description: 'Please fill this out',
        status: FormStatusEnum.Published,
        ownerId: 'o1',
        pages: [page1, page2],
        validators: [],
        createdAt: '',
        updatedAt: ''
    };

    async function setup(formValue: FormModel | null = mockForm, alreadySubmittedValue = false) {
        const formSignal = signal<FormModel | null>(null);
        const alreadySubmittedSignal = signal(alreadySubmittedValue);

        let resolveLoadForm!: () => void;
        const loadFormPromise = new Promise<void>((resolve) => {
            resolveLoadForm = () => {
                formSignal.set(formValue);
                resolve();
            };
        });

        facade = {
            form: formSignal.asReadonly(),
            alreadySubmitted: alreadySubmittedSignal.asReadonly(),
            loadForm: vi.fn().mockReturnValue(loadFormPromise),
            submitForm: vi.fn()
        };

        formBuilder = {
            buildPageGroups: vi.fn().mockReturnValue([new FormGroup({ name: new FormControl(null) }), new FormGroup({})])
        };

        TestBed.configureTestingModule({
            imports: [FormRenderer],
            providers: [
                { provide: FormRendererFacade, useValue: facade },
                { provide: DynamicFormBuilderService, useValue: formBuilder }
            ]
        });

        fixture = TestBed.createComponent(FormRenderer);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'form1');

        // First render: loadForm() called, promise still pending -> shows "Loading form..." safely.
        fixture.detectChanges();

        // Now resolve outside of Angular's CD cycle, then let the component's own
        // .then() callback (which sets pageGroups) run via a microtask flush.
        resolveLoadForm();
        await fixture.whenStable();
        fixture.detectChanges();
    }
    it('should create', async () => {
        await setup();
        expect(component).toBeTruthy();
    });

    it('should call facade.loadForm with the given id on init', async () => {
        await setup();
        expect(facade.loadForm).toHaveBeenCalledWith('form1');
    });

    it('should build page groups once the form is loaded', async () => {
        await setup();
        expect(formBuilder.buildPageGroups).toHaveBeenCalledWith(mockForm);
        expect(component.pageGroups().length).toBe(2);
    });

    it('should show the loading state while no form is available', async () => {
        await setup(null);
        expect(fixture.nativeElement.textContent).toContain('Loading form...');
    });

    it('should show the already-submitted banner when alreadySubmitted is true', async () => {
        await setup(mockForm, true);
        const banner = fixture.nativeElement.querySelector('app-already-submitted-banner');
        expect(banner).toBeTruthy();
    });

    it('should render the form title and description once loaded', async () => {
        await setup();
        expect(fixture.nativeElement.textContent).toContain('Contact Form');
        expect(fixture.nativeElement.textContent).toContain('Please fill this out');
    });

    describe('isLastStep', () => {
        it('should be false when activeStep is not the last page', async () => {
            await setup();
            expect(component.isLastStep()).toBe(false);
        });

        it('should be true when activeStep equals the number of pages', async () => {
            await setup();
            component.activeStep.set(2);
            expect(component.isLastStep()).toBe(true);
        });
    });

    describe('goToStep', () => {
        it('should mark the current group as touched', async () => {
            await setup();
            const currentGroup = component.pageGroups()[0];
            const markSpy = vi.spyOn(currentGroup, 'markAllAsTouched');

            component.goToStep(2, vi.fn());

            expect(markSpy).toHaveBeenCalled();
        });

        it('should not advance if moving forward and the current group is invalid', async () => {
            await setup();
            component
                .pageGroups()[0]
                .get('name')
                ?.setValidators(() => ({ required: true }));
            component.pageGroups()[0].get('name')?.updateValueAndValidity();
            const activateCallback = vi.fn();

            component.goToStep(2, activateCallback);

            expect(component.activeStep()).toBe(1);
            expect(activateCallback).not.toHaveBeenCalled();
        });

        it('should advance when moving forward and the current group is valid', async () => {
            await setup();
            const activateCallback = vi.fn();

            component.goToStep(2, activateCallback);

            expect(component.activeStep()).toBe(2);
            expect(activateCallback).toHaveBeenCalledWith(2);
        });

        it('should allow moving backward even if the current group is invalid', async () => {
            await setup();
            component.activeStep.set(2);
            component
                .pageGroups()[0]
                .get('name')
                ?.setValidators(() => ({ required: true }));
            component.pageGroups()[0].get('name')?.updateValueAndValidity();
            const activateCallback = vi.fn();

            component.goToStep(1, activateCallback);

            expect(component.activeStep()).toBe(1);
            expect(activateCallback).toHaveBeenCalledWith(1);
        });
    });

    describe('onSubmit', () => {
        it('should set a submitError and not call facade.submitForm if any group is invalid', async () => {
            await setup();
            component
                .pageGroups()[0]
                .get('name')
                ?.setValidators(() => ({ required: true }));
            component.pageGroups()[0].get('name')?.updateValueAndValidity();

            await component.onSubmit();

            expect(component.submitError()).toBe('Please fix the errors before submitting.');
            expect(facade.submitForm).not.toHaveBeenCalled();
        });

        it('should call facade.submitForm with merged answers from all groups when valid', async () => {
            await setup();
            component.pageGroups()[0].get('name')?.setValue('John');
            (facade.submitForm as ReturnType<typeof vi.fn>).mockResolvedValue({ id: 's1' });

            await component.onSubmit();

            expect(facade.submitForm).toHaveBeenCalledWith({ name: 'John' });
        });

        it('should set isSubmitting to true during submission and false afterward', async () => {
            await setup();
            component.pageGroups()[0].get('name')?.setValue('John');
            let resolveSubmit: (v: unknown) => void;
            (facade.submitForm as ReturnType<typeof vi.fn>).mockReturnValue(
                new Promise((resolve) => {
                    resolveSubmit = resolve;
                })
            );

            const submitPromise = component.onSubmit();
            expect(component.isSubmitting()).toBe(true);

            resolveSubmit!({ id: 's1' });
            await submitPromise;

            expect(component.isSubmitting()).toBe(false);
        });

        it('should set submitError if facade.submitForm rejects', async () => {
            await setup();
            component.pageGroups()[0].get('name')?.setValue('John');
            (facade.submitForm as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Server unavailable'));

            await component.onSubmit();

            expect(component.submitError()).toBe('Server unavailable');
            expect(component.isSubmitting()).toBe(false);
        });
    });
});
