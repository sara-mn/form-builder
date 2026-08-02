import { Component, computed, input } from '@angular/core';
import { FormStatusEnum } from '@app/domain/form/enums/form-status.enum';

@Component({
    selector: 'app-status-badge',
    imports: [],
    templateUrl: './status-badge.html',
    styleUrl: './status-badge.scss'
})
export class StatusBadge {
    status = input.required<FormStatusEnum>();
    isLocked = input<boolean>(false);

    label = computed(() => {
        if (this.isLocked()) return 'Locked';
        return this.status() === FormStatusEnum.Published ? 'Published' : 'Draft';
    });

    variant = computed(() => {
        if (this.isLocked()) return 'locked';
        return this.status() === FormStatusEnum.Published ? 'published' : 'draft';
    });
}
