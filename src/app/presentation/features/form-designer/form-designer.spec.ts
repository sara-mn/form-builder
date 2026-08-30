import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { FormDesigner } from './form-designer';
import { FormDesignerFacade } from './services/form-designer.facade';
import { FormModel } from '@app/domain/form/models/form.model';
import { FormPageModel } from '@app/domain/form/models/form-page.model';
import { FieldConfigModel, FormStatusEnum } from '@app/domain';
import { FieldTypeEnum } from '@domain/form/enums/field-type.enum';

describe('FormDesigner', () => {
    let component: FormDesigner;
    let fixture: ComponentFixture<FormDesigner>;
    let facade: Pick<FormDesignerFacade, 'form' | 'isLocked' | 'loadForm' | 'saveForm' | 'cloneForm' | 'updateMetadata' | 'addPage' | 'deletePage' | 'addField' | 'updateField' | 'deleteField'>;
    let router: Router;
    let formSignal: WritableSignal<FormModel | null>;

    const page1: FormPageModel = { id: 'p1', title: 'Page 1', order: 0, fields: [], validators: [] };
    const page2: FormPageModel = { id: 'p2', title: 'Page 2', order: 1, fields: [], validators: [] };

    const mockForm: FormModel = {
        id: 'f1',
        title: 'Survey',
        description: 'A survey',
        status: FormStatusEnum.Draft,
        ownerId: 'u1',
        pages: [page1, page2],
        validators: [],
        createdAt: '',
        updatedAt: ''
    };

    const mockField: FieldConfigModel = {
        id: 'field1',
        name: 'fieldName',
        label: 'Field Label',
        type: FieldTypeEnum.Text,
        order: 0,
        validators: []
    };

    async function setup(formValue: FormModel | null = mockForm, isLockedValue = false) {
        formSignal = signal<FormModel | null>(null);
        const isLockedSignal = signal(isLockedValue);

        let resolveLoadForm!: () => void;
        const loadFormPromise = new Promise<void>((resolve) => {
            resolveLoadForm = () => {
                formSignal.set(formValue);
                resolve();
            };
        });

        facade = {
            // NOTE: exposing the writable signal directly (not .asReadonly()) so
            // mock method implementations below can mutate it, simulating what
            // the real facade does internally.
            form: formSignal,
            isLocked: isLockedSignal.asReadonly(),
            loadForm: vi.fn().mockReturnValue(loadFormPromise),
            saveForm: vi.fn().mockResolvedValue(undefined),
            cloneForm: vi.fn(),
            updateMetadata: vi.fn().mockImplementation((title: string, description: string) => {
                const current = formSignal();
                if (current) formSignal.set({ ...current, title, description });
            }),
            addPage: vi.fn().mockImplementation(() => {
                const current = formSignal();
                if (!current) return;
                const newPage: FormPageModel = {
                    id: 'p3',
                    title: `Page ${current.pages.length + 1}`,
                    order: current.pages.length,
                    fields: [],
                    validators: []
                };
                formSignal.set({ ...current, pages: [...current.pages, newPage] });
            }),
            deletePage: vi.fn().mockImplementation((pageId: string) => {
                const current = formSignal();
                if (!current) return;
                formSignal.set({ ...current, pages: current.pages.filter((p) => p.id !== pageId) });
            }),
            addField: vi.fn(),
            updateField: vi.fn(),
            deleteField: vi.fn()
        };

        TestBed.configureTestingModule({
            imports: [FormDesigner],
            providers: [provideRouter([]), { provide: FormDesignerFacade, useValue: facade }]
        });

        fixture = TestBed.createComponent(FormDesigner);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'f1');

        fixture.detectChanges();
        resolveLoadForm();
        await fixture.whenStable();
        fixture.detectChanges();

        router = TestBed.inject(Router);
    }

    it('should create', async () => {
        await setup();
        expect(component).toBeTruthy();
    });

    it('should call facade.loadForm with the given id', async () => {
        await setup();
        expect(facade.loadForm).toHaveBeenCalledWith('f1');
    });

    it('should select the first page after the form loads', async () => {
        await setup();
        expect(component.selectedPageId()).toBe('p1');
    });

    it('should show the loading state when there is no form yet', async () => {
        await setup(null);
        expect(fixture.nativeElement.textContent).toContain('Loading form...');
    });

    describe('selectedPage getter', () => {
        it('should return the page matching selectedPageId', async () => {
            await setup();
            expect(component.selectedPage?.id).toBe('p1');
        });

        it('should return null if no page is selected', async () => {
            await setup();
            component.selectedPageId.set(null);
            expect(component.selectedPage).toBeNull();
        });
    });

    describe('onSave', () => {
        it('should call facade.saveForm and toggle isSaving', async () => {
            await setup();
            const savePromise = component.onSave();
            expect(component.isSaving()).toBe(true);
            await savePromise;
            expect(facade.saveForm).toHaveBeenCalled();
            expect(component.isSaving()).toBe(false);
        });
    });

    describe('onCloneRequested', () => {
        it('should clone the form and navigate to the edit page of the clone', async () => {
            await setup();
            const clonedForm = { ...mockForm, id: 'f2' };
            (facade.cloneForm as ReturnType<typeof vi.fn>).mockResolvedValue(clonedForm);
            const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

            await component.onCloneRequested();

            expect(navigateSpy).toHaveBeenCalledWith(['/forms', 'f2', 'edit']);
            expect(component.isCloning()).toBe(false);
        });

        it('should reset isCloning even if cloneForm rejects', async () => {
            await setup();
            (facade.cloneForm as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('failed'));

            await expect(component.onCloneRequested()).rejects.toThrow('failed');

            expect(component.isCloning()).toBe(false);
        });
    });

    describe('onMetadataChanged', () => {
        it('should call facade.updateMetadata with the new title and description', async () => {
            await setup();
            component.onMetadataChanged({ title: 'New Title', description: 'New Desc' });
            expect(facade.updateMetadata).toHaveBeenCalledWith('New Title', 'New Desc');
        });
    });

    describe('onPageSelected', () => {
        it('should update selectedPageId', async () => {
            await setup();
            component.onPageSelected('p2');
            expect(component.selectedPageId()).toBe('p2');
        });
    });

    describe('onPageAdded', () => {
        it('should call facade.addPage', async () => {
            await setup();
            component.onPageAdded();
            expect(facade.addPage).toHaveBeenCalled();
        });

        it('should select the newly added page', async () => {
            await setup();
            component.onPageAdded();
            expect(component.selectedPageId()).toBe('p3');
        });
    });

    describe('onPageDeleted', () => {
        it('should call facade.deletePage', async () => {
            await setup();
            component.onPageDeleted('p2');
            expect(facade.deletePage).toHaveBeenCalledWith('p2');
        });

        it('should reselect the first remaining page if the deleted page was selected', async () => {
            await setup();
            component.selectedPageId.set('p1');

            component.onPageDeleted('p1');

            expect(component.selectedPageId()).toBe('p2');
        });

        it('should not change selectedPageId if a different page was deleted', async () => {
            await setup();
            component.selectedPageId.set('p1');

            component.onPageDeleted('p2');

            expect(component.selectedPageId()).toBe('p1');
        });
    });

    describe('field dialog flow', () => {
        it('should open the dialog with no editing field on add', async () => {
            await setup();
            component.onFieldAddRequested();
            expect(component.isDialogOpen()).toBe(true);
            expect(component.editingField()).toBeNull();
        });

        it('should open the dialog with the field on edit', async () => {
            await setup();
            component.onFieldEditRequested(mockField);
            expect(component.isDialogOpen()).toBe(true);
            expect(component.editingField()).toEqual(mockField);
        });

        it('should close the dialog and clear editingField on close', async () => {
            await setup();
            component.onFieldEditRequested(mockField);
            component.onFieldDialogClosed();
            expect(component.isDialogOpen()).toBe(false);
            expect(component.editingField()).toBeNull();
        });

        it('should call facade.addField when saving a new field', async () => {
            await setup();
            component.onFieldAddRequested();
            component.onFieldSaved(mockField);
            expect(facade.addField).toHaveBeenCalledWith('p1', mockField);
            expect(component.isDialogOpen()).toBe(false);
        });

        it('should call facade.updateField when saving an edited field', async () => {
            await setup();
            component.onFieldEditRequested(mockField);
            const updated = { ...mockField, label: 'Updated' };
            component.onFieldSaved(updated);
            expect(facade.updateField).toHaveBeenCalledWith('p1', updated);
        });
    });

    describe('onFieldDeleteRequested', () => {
        it('should call facade.deleteField with the selected page id', async () => {
            await setup();
            component.onFieldDeleteRequested(mockField);
            expect(facade.deleteField).toHaveBeenCalledWith('p1', 'field1');
        });

        it('should do nothing if no page is selected', async () => {
            await setup();
            component.selectedPageId.set(null);
            component.onFieldDeleteRequested(mockField);
            expect(facade.deleteField).not.toHaveBeenCalled();
        });
    });
});
