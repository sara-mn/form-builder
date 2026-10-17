import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { signal } from '@angular/core';
import { DashboardFacade, DashboardStats } from './services/dashboard.facade';
import { FormListItem } from '@app/application/form/get-forms-with-submission-counts.use-case';
import { UserRoleEnum } from '@app/domain/user/enums/user-role.enum';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { User } from '@app/domain/user/models/user.model';
import { provideRouter } from '@angular/router';

describe('Dashboard', () => {
    let component: Dashboard;
    let fixture: ComponentFixture<Dashboard>;
    let dashboardFacade: Pick<DashboardFacade, 'loadStats' | 'stats' | 'formListItems'>;

    beforeEach(async () => {
        const statsSignal = signal<DashboardStats>({
            totalForms: 0,
            publishedForms: 0,
            draftForms: 0,
            lockedForms: 0,
            totalSubmissions: 0
        });
        const formListItemsSignal = signal<FormListItem[]>([]);

        dashboardFacade = {
            loadStats: vi.fn().mockResolvedValue(undefined),
            stats: statsSignal,
            formListItems: formListItemsSignal
        };

        await TestBed.configureTestingModule({
            imports: [Dashboard],
            providers: [provideRouter([]), { provide: DashboardFacade, useValue: dashboardFacade }]
        }).compileComponents();

        fixture = TestBed.createComponent(Dashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call loadStats on init', () => {
        expect(dashboardFacade.loadStats).toHaveBeenCalled();
    });

    function loginAs(role: UserRoleEnum): void {
        TestBed.inject(AuthState).setUser({ id: 'u1', roles: [role] } as unknown as User);
        fixture.detectChanges();
    }

    it('should hide New Form and the submissions chart from a Viewer', () => {
        loginAs(UserRoleEnum.Viewer);

        const element = fixture.nativeElement as HTMLElement;
        expect(element.textContent).not.toContain('New Form');
        expect(element.querySelector('app-submissions-chart')).toBeNull();
    });

    it('should show New Form and the submissions chart to an Admin', () => {
        loginAs(UserRoleEnum.Admin);

        const element = fixture.nativeElement as HTMLElement;
        expect(element.textContent).toContain('New Form');
        expect(element.querySelector('app-submissions-chart')).not.toBeNull();
    });
});
