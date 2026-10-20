import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LockBanner } from './components/lock-banner/lock-banner';
import { FormMetadataPanel, MetadataChange } from './components/form-metadata-panel/form-metadata-panel';
import { PageSidebar } from './components/page-sidebar/page-sidebar';
import { FieldList } from './components/field-list/field-list';
import { FieldEditorDialog } from './components/field-editor-dialog/field-editor-dialog';
import {
    FieldConfigModel,
    FormPageModel,
    FormStatusEnum,
    getPublishError,
    Guid,
    UserPermissionEnum
} from '@app/domain';
import { FormDesignerFacade } from './services/form-designer.facade';
import { ButtonModule } from 'primeng/button';
import { AuthState } from '@app/presentation/core/services/auth-state';

@Component({
    selector: 'app-form-designer',
    imports: [LockBanner, FormMetadataPanel, PageSidebar, FieldList, FieldEditorDialog, ButtonModule],
    templateUrl: './form-designer.html'
})
export class FormDesigner {
    id = input.required<Guid>();

    private facade = inject(FormDesignerFacade);
    private router = inject(Router);

    form = this.facade.form;
    isLocked = this.facade.isLocked;

    selectedPageId = signal<Guid | null>(null);
    isDialogOpen = signal<boolean>(false);
    editingField = signal<FieldConfigModel | null>(null);
    isCloning = signal<boolean>(false);
    isSaving = signal<boolean>(false);
    saveError = signal<string | null>(null);
    private authState = inject(AuthState);

    isChangingStatus = signal<boolean>(false);

    canPublish = computed(() => this.authState.hasPermission(UserPermissionEnum.FormPublish));
    isPublished = computed(() => this.form()?.status === FormStatusEnum.Published);

    /** Why publishing is blocked right now; null when it is allowed or the form is already published. */
    publishBlockedReason = computed(() => {
        const form = this.form();
        return form && !this.isPublished() ? getPublishError(form) : null;
    });

    statusActionLabel = computed(() => {
        if (this.isLocked()) {
            return this.isPublished() ? 'Unpublish' : 'Publish';
        }
        return this.isPublished() ? 'Save and unpublish' : 'Save and publish';
    });
    constructor() {
        effect(() => {
            const formId = this.id();
            if (formId) {
                this.facade.loadForm(formId).then(() => {
                    const firstPage = this.form()?.pages[0];
                    if (firstPage) this.selectedPageId.set(firstPage.id);
                });
            }
        });
    }

    get selectedPage(): FormPageModel | null {
        const form = this.form();
        const pageId = this.selectedPageId();
        if (!form || !pageId) return null;
        return form.pages.find((p) => p.id === pageId) ?? null;
    }

    async onSave(): Promise<void> {
        this.isSaving.set(true);
        this.saveError.set(null);
        try {
            await this.facade.saveForm();
            await this.router.navigate(['/form-list']);
        } catch (error) {
            this.saveError.set(error instanceof Error ? error.message : 'Failed to save the form. Please try again.');
        } finally {
            this.isSaving.set(false);
        }
    }

    async onCloneRequested(): Promise<void> {
        this.isCloning.set(true);
        try {
            const cloned = await this.facade.cloneForm();
            this.router.navigate(['/forms', cloned.id, 'edit']);
        } finally {
            this.isCloning.set(false);
        }
    }

    onMetadataChanged(change: MetadataChange): void {
        this.facade.updateMetadata(change.title, change.description);
    }

    onPageSelected(pageId: Guid): void {
        this.selectedPageId.set(pageId);
    }

    onPageAdded(): void {
        this.facade.addPage();
        const form = this.form();
        const lastPage = form?.pages[form.pages.length - 1];
        if (lastPage) this.selectedPageId.set(lastPage.id);
    }

    onPageDeleted(pageId: Guid): void {
        this.facade.deletePage(pageId);
        if (this.selectedPageId() === pageId) {
            const firstPage = this.form()?.pages[0];
            this.selectedPageId.set(firstPage?.id ?? null);
        }
    }

    onFieldAddRequested(): void {
        this.editingField.set(null);
        this.isDialogOpen.set(true);
    }

    onFieldEditRequested(field: FieldConfigModel): void {
        this.editingField.set(field);
        this.isDialogOpen.set(true);
    }

    onFieldDeleteRequested(field: FieldConfigModel): void {
        const pageId = this.selectedPageId();
        if (pageId) this.facade.deleteField(pageId, field.id);
    }

    onFieldDialogClosed(): void {
        this.isDialogOpen.set(false);
        this.editingField.set(null);
    }

    onFieldSaved(field: FieldConfigModel): void {
        const pageId = this.selectedPageId();
        if (!pageId) return;

        if (this.editingField()) {
            this.facade.updateField(pageId, field);
        } else {
            this.facade.addField(pageId, field);
        }

        this.isDialogOpen.set(false);
        this.editingField.set(null);
    }

    async onStatusAction(): Promise<void> {
        this.isChangingStatus.set(true);
        this.saveError.set(null);
        try {
            if (this.isPublished()) {
                await this.facade.unpublishForm();
            } else {
                await this.facade.publishForm();
            }
            await this.router.navigate(['/form-list']);
        } catch (error) {
            this.saveError.set(
                error instanceof Error ? error.message : 'Failed to change the form status. Please try again.'
            );
        } finally {
            this.isChangingStatus.set(false);
        }
    }
}
