import { Component, computed, input } from '@angular/core';
import { FormStatusEnum } from '@app/domain/form/enums/form-status.enum';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-status-badge',
    imports: [TagModule],
    templateUrl: './status-badge.html'
})
export class StatusBadge {
    status = input.required<FormStatusEnum>();
    isLocked = input<boolean>(false);

    label = computed(() => {
        if (this.isLocked()) return 'Locked';
        return this.status() === FormStatusEnum.Published ? 'Published' : 'Draft';
    });

    severity = computed<'secondary' | 'success' | 'danger'>(() => {
        if (this.isLocked()) return 'danger';
        return this.status() === FormStatusEnum.Published ? 'success' : 'secondary';
    });
}
