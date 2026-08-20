import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Sidebar } from './sidebar';
import { NAV_ITEMS } from './nav-items';
import { ShellState } from '../../shell-state';

describe('Sidebar', () => {
    let component: Sidebar;
    let fixture: ComponentFixture<Sidebar>;
    let shellState: ShellState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Sidebar],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(Sidebar);
        component = fixture.componentInstance;
        shellState = TestBed.inject(ShellState);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render one app-nav-item per NAV_ITEMS entry', () => {
        const navItemElements = fixture.nativeElement.querySelectorAll('app-nav-item');
        expect(navItemElements.length).toBe(NAV_ITEMS.length);
    });

    it('should not show translate-x-0 class when mobile sidebar is closed', () => {
        const nav: HTMLElement = fixture.nativeElement.querySelector('[data-testid="sidebar-nav"]');
        expect(nav.classList.contains('translate-x-0')).toBe(false);
    });

    it('should show translate-x-0 class when mobile sidebar is open', () => {
        shellState.toggleMobileSidebar();
        fixture.detectChanges();

        const nav: HTMLElement = fixture.nativeElement.querySelector('[data-testid="sidebar-nav"]');
        expect(nav.classList.contains('translate-x-0')).toBe(true);
    });

    it('should not render backdrop when mobile sidebar is closed', () => {
        const backdrop = fixture.nativeElement.querySelector('[data-testid="sidebar-backdrop"]');
        expect(backdrop).toBeFalsy();
    });

    it('should render backdrop when mobile sidebar is open', () => {
        shellState.toggleMobileSidebar();
        fixture.detectChanges();

        const backdrop = fixture.nativeElement.querySelector('[data-testid="sidebar-backdrop"]');
        expect(backdrop).toBeTruthy();
    });

    it('should close mobile sidebar when backdrop is clicked', () => {
        shellState.toggleMobileSidebar();
        fixture.detectChanges();
        expect(shellState.mobileSidebarOpen()).toBe(true);

        const backdrop: HTMLElement = fixture.nativeElement.querySelector('[data-testid="sidebar-backdrop"]');
        backdrop.click();
        fixture.detectChanges();

        expect(shellState.mobileSidebarOpen()).toBe(false);
    });
    it('should have a keyboard-accessible role and tabindex on the backdrop', () => {
        shellState.toggleMobileSidebar();
        fixture.detectChanges();

        const backdrop: HTMLElement = fixture.nativeElement.querySelector('[data-testid="sidebar-backdrop"]');
        expect(backdrop.getAttribute('role')).toBe('button');
        expect(backdrop.getAttribute('tabindex')).toBe('0');
        expect(backdrop.getAttribute('aria-label')).toBe('Close navigation menu');
    });

    it('should close mobile sidebar when Enter is pressed on the backdrop', () => {
        shellState.toggleMobileSidebar();
        fixture.detectChanges();
        expect(shellState.mobileSidebarOpen()).toBe(true);

        const backdrop: HTMLElement = fixture.nativeElement.querySelector('[data-testid="sidebar-backdrop"]');
        backdrop.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        fixture.detectChanges();

        expect(shellState.mobileSidebarOpen()).toBe(false);
    });

    it('should close mobile sidebar when Escape is pressed on the backdrop', () => {
        shellState.toggleMobileSidebar();
        fixture.detectChanges();
        expect(shellState.mobileSidebarOpen()).toBe(true);

        const backdrop: HTMLElement = fixture.nativeElement.querySelector('[data-testid="sidebar-backdrop"]');
        backdrop.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        fixture.detectChanges();

        expect(shellState.mobileSidebarOpen()).toBe(false);
    });
});
