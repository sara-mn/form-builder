import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { DashboardStats } from '../../services/dashboard.facade';
import { PIcon } from '@primeicons/angular';

interface StatTile {
    label: string;
    value: number;
    sublabel: string;
    icon: string;
    colorClasses: string;
}

@Component({
    selector: 'app-stats-widget',
    standalone: true,
    imports: [NgClass, PIcon],
    templateUrl: './stats-widget.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsWidget {
    readonly stats = input.required<DashboardStats>();

    protected readonly tiles = computed<StatTile[]>(() => {
        const s = this.stats();
        return [
            { label: 'Total Forms', value: s.totalForms, sublabel: `${s.draftForms} draft`, icon: 'file', colorClasses: 'bg-primary-100 text-primary-600 dark:bg-primary-400/10 dark:text-primary-400' },
            { label: 'Published', value: s.publishedForms, sublabel: 'visible to viewers', icon: 'check-circle', colorClasses: 'bg-green-100 text-green-600 dark:bg-green-400/10 dark:text-green-400' },
            { label: 'Locked', value: s.lockedForms, sublabel: 'have submissions', icon: 'lock', colorClasses: 'bg-orange-100 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400' },
            { label: 'Submissions', value: s.totalSubmissions, sublabel: 'across all forms', icon: 'inbox', colorClasses: 'bg-purple-100 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400' }
        ];
    });
}
