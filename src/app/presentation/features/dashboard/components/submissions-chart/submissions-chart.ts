import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FormListItem } from '@app/application/form/get-forms-with-submission-counts.use-case';

@Component({
    selector: 'app-submissions-chart',
    standalone: true,
    imports: [ChartModule],
    templateUrl: './submissions-chart.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmissionsChart {
    readonly items = input.required<FormListItem[]>();

    protected readonly chartData = computed(() => {
        const sorted = [...this.items()].sort((a, b) => b.submissionCount - a.submissionCount);
        return {
            labels: sorted.map((i) => i.form.title),
            datasets: [{ label: 'Submissions', data: sorted.map((i) => i.submissionCount), backgroundColor: 'rgba(99, 102, 241, 0.6)', borderColor: 'rgb(99, 102, 241)', borderWidth: 1, borderRadius: 6 }]
        };
    });

    protected readonly chartOptions = {
        indexAxis: 'y' as const,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } }
    };
}
