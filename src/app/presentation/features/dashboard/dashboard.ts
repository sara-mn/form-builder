import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardFacade } from './services/dashboard.facade';
import { StatsWidget } from './components/stats-widget/stats-widget';
import { RecentForms } from './components/recent-forms/recent-forms';
import { SubmissionsChart } from './components/submissions-chart/submissions-chart';
import { Plus } from '@primeicons/angular';
import { UserPermissionEnum } from '@app/domain/user/enums/user-permission.enum';
import { AuthState } from '@app/presentation/core/services/auth-state';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [StatsWidget, RecentForms, SubmissionsChart, Plus],
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
    protected readonly dashboardFacade = inject(DashboardFacade);
    private readonly router = inject(Router);

    private readonly authState = inject(AuthState);

    protected readonly canCreate = computed(() => this.authState.hasPermission(UserPermissionEnum.FormCreate));
    protected readonly canEdit = computed(() => this.authState.hasPermission(UserPermissionEnum.FormEdit));
    protected readonly canViewSubmissions = computed(() =>
        this.authState.hasPermission(UserPermissionEnum.SubmissionView)
    );

    ngOnInit(): void {
        this.dashboardFacade.loadStats();
    }

    protected onNewFormClick(): void {
        this.router.navigate(['/form-list']); // create-form dialog lives there — avoids duplicating that flow here
    }
}
