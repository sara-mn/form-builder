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
    testId: string;
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
            {
                label: 'Total Forms',
                value: s.totalForms,
                sublabel: `${s.draftForms} draft`,
                icon: 'file',
                colorClasses: '...',
                testId: 'stats-total-forms'
            },
            {
                label: 'Published',
                value: s.publishedForms,
                sublabel: 'visible to viewers',
                icon: 'check-circle',
                colorClasses: '...',
                testId: 'stats-published-forms'
            },
            {
                label: 'Locked',
                value: s.lockedForms,
                sublabel: 'have submissions',
                icon: 'lock',
                colorClasses: '...',
                testId: 'stats-locked-forms'
            },
            {
                label: 'Submissions',
                value: s.totalSubmissions,
                sublabel: 'across all forms',
                icon: 'inbox',
                colorClasses: '...',
                testId: 'stats-total-submissions'
            }
        ];
    });
}
