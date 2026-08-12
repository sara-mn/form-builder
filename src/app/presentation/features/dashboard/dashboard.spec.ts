import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { signal } from '@angular/core';
import { DashboardFacade, DashboardStats } from './services/dashboard.facade';

describe('Dashboard', () => {
    let component: Dashboard;
    let fixture: ComponentFixture<Dashboard>;
    let dashboardFacade: Pick<DashboardFacade, 'loadStats' | 'stats'>;

    beforeEach(async () => {
        const statsSignal = signal<DashboardStats>({
            totalForms: 0,
            publishedForms: 0,
            draftForms: 0,
            lockedForms: 0,
            totalSubmissions: 0
        });

        dashboardFacade = {
            loadStats: vi.fn().mockResolvedValue(undefined),
            stats: statsSignal
        };

        await TestBed.configureTestingModule({
            imports: [Dashboard],
            providers: [{ provide: DashboardFacade, useValue: dashboardFacade }]
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
});
