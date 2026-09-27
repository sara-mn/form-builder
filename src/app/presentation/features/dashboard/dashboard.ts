import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardFacade } from './services/dashboard.facade';
import { StatsWidget } from './components/stats-widget/stats-widget';
import { RecentForms } from './components/recent-forms/recent-forms';
import { SubmissionsChart } from './components/submissions-chart/submissions-chart';
import { Plus } from '@primeicons/angular';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [StatsWidget, RecentForms, SubmissionsChart, Plus],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
    protected readonly dashboardFacade = inject(DashboardFacade);
    private readonly router = inject(Router);

    ngOnInit(): void {
        this.dashboardFacade.loadStats();
    }

    protected onNewFormClick(): void {
        this.router.navigate(['/form-list']); // create-form dialog lives there — avoids duplicating that flow here
    }
}
