import { Component, inject, OnInit, signal } from '@angular/core';
import { FormListFacade } from '../../services/form-list.facade';
import { Router } from '@angular/router';
import { Guid } from '@app/domain/shared/types/guid.type';
import { NewFormData, NewFormDialog } from '../new-form-dialog/new-form-dialog';
import { StatusBadge } from '../status-badge/status-badge';
import { TableModule } from 'primeng/table';
import { FormStatusEnum } from '@app/domain';

@Component({
    selector: 'app-form-list-page',
    imports: [TableModule, NewFormDialog, StatusBadge],
    templateUrl: './form-list-page.html',
    styleUrl: './form-list-page.scss'
})
export class FormListPage implements OnInit {
    private facade = inject(FormListFacade);
    private router = inject(Router);
    readonly FormStatusEnum = FormStatusEnum;
    items = this.facade.formListItems;

    isNewFormDialogOpen = signal<boolean>(false);
    cloningFormId = signal<Guid | null>(null);

    ngOnInit(): void {
        this.facade.loadForms().then(() => {
            console.log('Loaded items:', this.items());
            console.log('First item structure:', JSON.stringify(this.items()[0], null, 2));
        });
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

    async onDelete(formId: Guid, title: string): Promise<void> {
        if (confirm(`Delete form "${title}"? This cannot be undone.`)) {
            await this.facade.deleteForm(formId);
        }
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
