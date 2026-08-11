import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { Topbar } from './topbar';
import { ShellState } from '../shell-state';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';
import { User } from '@app/domain/user/models/user.model';
import { UserRoleEnum } from '@app/domain';

function createFakeUser(overrides: Partial<User> = {}): User {
    return {
        id: '1',
        email: 'admin@example.com',
        name: 'Sara Admin',
        roles: [UserRoleEnum.Admin],
        ...overrides
    } as User;
}

function createMockAuthFacade(): Pick<AuthFacade, 'logout'> {
    return {
        logout: vi.fn().mockResolvedValue(undefined)
    };
}

describe('Topbar', () => {
    let component: Topbar;
    let fixture: ComponentFixture<Topbar>;
    let shellState: ShellState;
    let authState: AuthState;
    let authFacade: Pick<AuthFacade, 'logout'>;
    let router: Router;

    beforeEach(async () => {
        authFacade = createMockAuthFacade();

        await TestBed.configureTestingModule({
            imports: [Topbar],
            providers: [provideRouter([]), { provide: AuthFacade, useValue: authFacade }]
        }).compileComponents();

        fixture = TestBed.createComponent(Topbar);
        component = fixture.componentInstance;
        shellState = TestBed.inject(ShellState);
        authState = TestBed.inject(AuthState);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    afterEach(() => {
        document.documentElement.classList.remove('app-dark');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle dark mode class on document when dark-mode button is clicked', () => {
        expect(document.documentElement.classList.contains('app-dark')).toBe(false);

        const darkModeButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Toggle dark mode"]');
        darkModeButton.click();
        fixture.detectChanges();

        expect(shellState.darkTheme()).toBe(true);
        expect(document.documentElement.classList.contains('app-dark')).toBe(true);
    });

    it('should toggle mobile sidebar when hamburger button is clicked', () => {
        expect(shellState.mobileSidebarOpen()).toBe(false);

        const hamburgerButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Toggle menu"]');
        hamburgerButton.click();
        fixture.detectChanges();

        expect(shellState.mobileSidebarOpen()).toBe(true);
    });

    it('should not display user info when no user is authenticated', () => {
        const userBlock = fixture.nativeElement.querySelector('[data-testid="user-info"]');
        expect(userBlock).toBeFalsy();
    });

    it('should display user name and first role when authenticated', () => {
        authState.setUser(createFakeUser({ name: 'Sara Admin', roles: [UserRoleEnum.Admin] }));
        fixture.detectChanges();

        const userBlock = fixture.nativeElement.querySelector('[data-testid="user-info"]');
        expect(userBlock.textContent).toContain('Sara Admin');
        expect(userBlock.textContent).toContain(UserRoleEnum.Admin);
    });

    it('should call authFacade.logout and navigate to /login on logout click', async () => {
        const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

        const logoutButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Log out"]');
        logoutButton.click();

        await fixture.whenStable();

        expect(authFacade.logout).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
});
