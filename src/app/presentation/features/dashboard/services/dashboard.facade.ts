import { computed, inject, Service, Signal, signal } from '@angular/core';
import { FormListItem, GetFormsWithSubmissionCountsUseCase } from '@app/application/form/get-forms-with-submission-counts.use-case';
import { FormStatusEnum } from '@app/domain';

export interface DashboardStats {
    totalForms: number;
    publishedForms: number;
    draftForms: number;
    lockedForms: number;
    totalSubmissions: number;
}

@Service()
export class DashboardFacade {
    private getFormsWithSubmissionCountsUseCase = inject(GetFormsWithSubmissionCountsUseCase);

    private readonly _formListItems = signal<FormListItem[]>([]);
    readonly formListItems: Signal<FormListItem[]> = this._formListItems.asReadonly();

    readonly stats: Signal<DashboardStats> = computed(() => {
        const items = this._formListItems();
        return {
            totalForms: items.length,
            publishedForms: items.filter((i) => i.form.status === FormStatusEnum.Published).length,
            draftForms: items.filter((i) => i.form.status === FormStatusEnum.Draft).length,
            lockedForms: items.filter((i) => i.submissionCount > 0).length,
            totalSubmissions: items.reduce((sum, i) => sum + i.submissionCount, 0)
        };
    });

    async loadStats(): Promise<void> {
        const items = await this.getFormsWithSubmissionCountsUseCase.execute();
        this._formListItems.set(items);
    }
}
