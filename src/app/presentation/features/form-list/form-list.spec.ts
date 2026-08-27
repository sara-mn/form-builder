import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormList } from './form-list';
import { FormListFacade } from './services/form-list.facade';
import { FormListItem } from '@app/application/form/get-forms-with-submission-counts.use-case';
import { FormModel } from '@app/domain/form/models/form.model';
import { FormStatusEnum } from '@app/domain';

describe('FormList', () => {
    let component: FormList;
    let fixture: ComponentFixture<FormList>;
    let facade: Pick<FormListFacade, 'formListItems' | 'loadForms' | 'createForm' | 'deleteForm' | 'cloneForm'>;
    let router: Router;

    const mockForm: FormModel = {
        id: 'f1',
        title: 'Survey',
        description: '',
        status: FormStatusEnum.Draft,
        ownerId: 'u1',
        pages: [{ id: 'p1' } as any],
        validators: [],
        createdAt: '',
        updatedAt: ''
    };

    const mockItem: FormListItem = { form: mockForm, submissionCount: 0 };

    function setup(initialItems: FormListItem[] = []) {
        facade = {
            formListItems: signal(initialItems).asReadonly(),
            loadForms: vi.fn().mockResolvedValue(undefined),
            createForm: vi.fn(),
            deleteForm: vi.fn().mockResolvedValue(undefined),
            cloneForm: vi.fn()
        };

        TestBed.configureTestingModule({
            imports: [FormList],
            providers: [provideRouter([]), { provide: FormListFacade, useValue: facade }]
        });

        fixture = TestBed.createComponent(FormList);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should call facade.loadForms on init', () => {
        setup();
        expect(facade.loadForms).toHaveBeenCalled();
    });

    it('should show the empty message when there are no forms', () => {
        setup([]);
        const emptyRow = fixture.nativeElement.textContent;
        expect(emptyRow).toContain('No forms yet');
    });

    it('should render a row per form item', () => {
        setup([mockItem]);
        const cell = fixture.nativeElement.textContent;
        expect(cell).toContain('Survey');
    });

    describe('new form dialog', () => {
        it('should open the dialog on onNewFormClick', () => {
            setup();
            component.onNewFormClick();
            expect(component.isNewFormDialogOpen()).toBe(true);
        });

        it('should close the dialog on onNewFormDialogClosed', () => {
            setup();
            component.onNewFormClick();
            component.onNewFormDialogClosed();
            expect(component.isNewFormDialogOpen()).toBe(false);
        });

        it('should create the form, close the dialog, and navigate to the edit page on save', async () => {
            setup();
            (facade.createForm as ReturnType<typeof vi.fn>).mockResolvedValue(mockForm);
            const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
            component.onNewFormClick();

            await component.onNewFormSaved({ title: 'Survey', description: 'desc' });

            expect(facade.createForm).toHaveBeenCalledWith('Survey', 'desc');
            expect(component.isNewFormDialogOpen()).toBe(false);
            expect(navigateSpy).toHaveBeenCalledWith(['/forms', 'f1', 'edit']);
        });
    });

    describe('onEdit', () => {
        it('should navigate to the edit page for the given form id', () => {
            setup();
            const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
            component.onEdit('f1');
            expect(navigateSpy).toHaveBeenCalledWith(['/forms', 'f1', 'edit']);
        });
    });

    describe('onFill', () => {
        it('should navigate to the fill page for the given form id', () => {
            setup();
            const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
            component.onFill('f1');
            expect(navigateSpy).toHaveBeenCalledWith(['/forms', 'f1', 'fill']);
        });
    });

    describe('onDelete', () => {
        it('should open a confirmation dialog with the form title in the message', () => {
            setup();
            const confirmationService = fixture.debugElement.injector.get(ConfirmationService);
            const confirmSpy = vi.spyOn(confirmationService, 'confirm');

            component.onDelete('f1', 'Survey');

            expect(confirmSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Delete form "Survey"? This cannot be undone.'
                })
            );
        });

        it('should call facade.deleteForm only after the user accepts the confirmation', () => {
            setup();
            const confirmationService = fixture.debugElement.injector.get(ConfirmationService);
            const confirmSpy = vi.spyOn(confirmationService, 'confirm');

            component.onDelete('f1', 'Survey');
            expect(facade.deleteForm).not.toHaveBeenCalled();

            const acceptCallback = confirmSpy.mock.calls[0][0].accept;
            acceptCallback?.();

            expect(facade.deleteForm).toHaveBeenCalledWith('f1');
        });
    });

    describe('onClone', () => {
        it('should set cloningFormId while cloning and clear it afterward', async () => {
            setup();
            const clonedForm = { ...mockForm, id: 'f2' };
            (facade.cloneForm as ReturnType<typeof vi.fn>).mockResolvedValue(clonedForm);
            vi.spyOn(router, 'navigate').mockResolvedValue(true);

            const clonePromise = component.onClone('f1');
            expect(component.cloningFormId()).toBe('f1');

            await clonePromise;

            expect(component.cloningFormId()).toBeNull();
        });

        it('should navigate to the edit page of the cloned form', async () => {
            setup();
            const clonedForm = { ...mockForm, id: 'f2' };
            (facade.cloneForm as ReturnType<typeof vi.fn>).mockResolvedValue(clonedForm);
            const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

            await component.onClone('f1');

            expect(navigateSpy).toHaveBeenCalledWith(['/forms', 'f2', 'edit']);
        });

        it('should clear cloningFormId even if cloneForm rejects', async () => {
            setup();
            (facade.cloneForm as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('failed'));

            await expect(component.onClone('f1')).rejects.toThrow('failed');

            expect(component.cloningFormId()).toBeNull();
        });
    });
});
