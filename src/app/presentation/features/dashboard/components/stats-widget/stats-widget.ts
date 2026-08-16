import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardStats } from '../../services/dashboard.facade';

@Component({
    selector: 'app-stats-widget',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './stats-widget.html'
})
export class StatsWidget {
    stats = input.required<DashboardStats>();
}
