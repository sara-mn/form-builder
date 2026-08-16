import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StatsWidget } from './stats-widget';
import { DashboardStats } from '../../services/dashboard.facade';

describe('StatsWidget', () => {
    let component: StatsWidget;
    let fixture: ComponentFixture<StatsWidget>;

    const stats: DashboardStats = {
        totalForms: 10,
        publishedForms: 6,
        draftForms: 4,
        lockedForms: 3,
        totalSubmissions: 27
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StatsWidget]
        }).compileComponents();

        fixture = TestBed.createComponent(StatsWidget);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('stats', stats);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the total forms count', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="stats-total-forms"]')).nativeElement as HTMLElement;
        expect(el.textContent).toContain('10');
        expect(el.textContent).toContain('4 draft');
    });

    it('should render the published forms count', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="stats-published-forms"]')).nativeElement as HTMLElement;
        expect(el.textContent).toContain('6');
    });

    it('should render the locked forms count', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="stats-locked-forms"]')).nativeElement as HTMLElement;
        expect(el.textContent).toContain('3');
    });

    it('should render the total submissions count', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="stats-total-submissions"]')).nativeElement as HTMLElement;
        expect(el.textContent).toContain('27');
    });
});
