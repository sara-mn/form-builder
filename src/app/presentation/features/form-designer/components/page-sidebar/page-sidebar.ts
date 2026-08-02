import { Component, input, output } from '@angular/core';
import { FormPageModel, Guid } from '@app/domain';

@Component({
    selector: 'app-page-sidebar',
    imports: [],
    templateUrl: './page-sidebar.html',
    styleUrl: './page-sidebar.scss'
})
export class PageSidebar {
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
        if (confirm('Delete this page and all its fields?')) {
            this.pageDeleted.emit(pageId);
        }
    }
}
