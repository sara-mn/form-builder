import { Component, inject, OnInit } from '@angular/core';
import { DashboardFacade } from './services/dashboard.facade';
import { StatsWidget } from './components/stats-widget/stats-widget';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [StatsWidget],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
    protected readonly dashboardFacade = inject(DashboardFacade);

    ngOnInit(): void {
        this.dashboardFacade.loadStats();
    }
}
