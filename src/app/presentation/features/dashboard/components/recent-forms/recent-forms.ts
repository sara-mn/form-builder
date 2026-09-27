import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { FormListItem } from '@app/application/form/get-forms-with-submission-counts.use-case';
import { FormStatusEnum } from '@app/domain';

@Component({
    selector: 'app-recent-forms',
    standalone: true,
    imports: [RouterLink, TagModule],
    templateUrl: './recent-forms.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentForms {
    readonly items = input.required<FormListItem[]>();
    protected readonly formStatusEnum = FormStatusEnum;

    protected readonly recent = computed(() => [...this.items()].sort((a, b) => new Date(b.form.updatedAt).getTime() - new Date(a.form.updatedAt).getTime()).slice(0, 5));

    protected severityFor(status: FormStatusEnum): 'success' | 'warn' {
        return status === this.formStatusEnum.Published ? 'success' : 'warn';
    }
}
