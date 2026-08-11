import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Shell } from './shell';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';

function createMockAuthFacade(): Pick<AuthFacade, 'logout'> {
    return {
        logout: vi.fn().mockResolvedValue(undefined)
    };
}

describe('Shell', () => {
    let component: Shell;
    let fixture: ComponentFixture<Shell>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Shell],
            providers: [provideRouter([]), { provide: AuthFacade, useValue: createMockAuthFacade() }]
        }).compileComponents();

        fixture = TestBed.createComponent(Shell);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render Topbar, Sidebar, and Footer', () => {
        const topbar = fixture.nativeElement.querySelector('app-topbar');
        const sidebar = fixture.nativeElement.querySelector('app-sidebar');
        const footer = fixture.nativeElement.querySelector('app-footer');

        expect(topbar).toBeTruthy();
        expect(sidebar).toBeTruthy();
        expect(footer).toBeTruthy();
    });

    it('should render router-outlet inside main', () => {
        const main = fixture.nativeElement.querySelector('main');
        const outlet = main.querySelector('router-outlet');

        expect(outlet).toBeTruthy();
    });
});
