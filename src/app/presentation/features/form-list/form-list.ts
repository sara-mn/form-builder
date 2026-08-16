import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from '@app/domain/shared/types/guid.type';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormStatusEnum } from '@app/domain';
import { NewFormData, NewFormDialog } from './components/new-form-dialog/new-form-dialog';
import { StatusBadge } from './components/status-badge/status-badge';
import { FormListFacade } from './services/form-list.facade';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-form-list',
    imports: [TableModule, ButtonModule, NewFormDialog, StatusBadge, ConfirmDialogModule],
    templateUrl: './form-list.html',
    providers: [ConfirmationService]
})
export class FormList implements OnInit {
    private facade = inject(FormListFacade);
    private router = inject(Router);
    private confirmationService = inject(ConfirmationService);
    readonly FormStatusEnum = FormStatusEnum;
    items = this.facade.formListItems;

    isNewFormDialogOpen = signal<boolean>(false);
    cloningFormId = signal<Guid | null>(null);

    ngOnInit(): void {
        this.facade.loadForms();
    }

    onNewFormClick(): void {
        this.isNewFormDialogOpen.set(true);
    }

    onNewFormDialogClosed(): void {
        this.isNewFormDialogOpen.set(false);
    }

    async onNewFormSaved(data: NewFormData): Promise<void> {
        const newForm = await this.facade.createForm(data.title, data.description);
        this.isNewFormDialogOpen.set(false);
        this.router.navigate(['/forms', newForm.id, 'edit']);
    }

    onEdit(formId: Guid): void {
        this.router.navigate(['/forms', formId, 'edit']);
    }

    onDelete(formId: Guid, title: string): void {
        this.confirmationService.confirm({
            message: `Delete form "${title}"? This cannot be undone.`,
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.facade.deleteForm(formId);
            }
        });
    }

    async onClone(formId: Guid): Promise<void> {
        this.cloningFormId.set(formId);
        try {
            const cloned = await this.facade.cloneForm(formId);
            this.router.navigate(['/forms', cloned.id, 'edit']);
        } finally {
            this.cloningFormId.set(null);
        }
    }

    onFill(formId: Guid): void {
        this.router.navigate(['/forms', formId, 'fill']);
    }
}
