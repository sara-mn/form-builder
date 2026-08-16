import { Component, inject, input, output } from '@angular/core';
import { FormPageModel, Guid } from '@app/domain';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Trash } from '@primeicons/angular/trash';

@Component({
    selector: 'app-page-sidebar',
    imports: [ButtonModule, ConfirmDialogModule, Trash],
    providers: [ConfirmationService],
    templateUrl: './page-sidebar.html'
})
export class PageSidebar {
    private confirmationService = inject(ConfirmationService);

    pages = input.required<FormPageModel[]>();
    selectedPageId = input<Guid | null>(null);
    disabled = input<boolean>(false);

    pageSelected = output<Guid>();
    pageAdded = output<void>();
    pageDeleted = output<Guid>();

    onSelect(pageId: Guid): void {
        this.pageSelected.emit(pageId);
    }

    onAdd(): void {
        this.pageAdded.emit();
    }

    onDelete(pageId: Guid, event: Event): void {
        event.stopPropagation();
        this.confirmationService.confirm({
            message: 'Delete this page and all its fields?',
            header: 'Confirm Deletion',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.pageDeleted.emit(pageId);
            }
        });
    }
}
