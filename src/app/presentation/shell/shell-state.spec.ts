import { TestBed } from '@angular/core/testing';

import { ShellState } from './shell-state';

describe('ShellState', () => {
    let service: ShellState;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShellState);
    });

    afterEach(() => {
        document.documentElement.classList.remove('app-dark');
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('dark mode', () => {
        it('should default to darkTheme false and theme light', () => {
            expect(service.darkTheme()).toBe(false);
            expect(service.theme()).toBe('light');
        });

        it('should toggle darkTheme and theme on toggleDarkMode()', () => {
            service.toggleDarkMode();
            expect(service.darkTheme()).toBe(true);
            expect(service.theme()).toBe('dark');

            service.toggleDarkMode();
            expect(service.darkTheme()).toBe(false);
            expect(service.theme()).toBe('light');
        });

        it('should add app-dark class to document on toggleDarkMode() when enabling', () => {
            expect(document.documentElement.classList.contains('app-dark')).toBe(false);

            service.toggleDarkMode();

            expect(document.documentElement.classList.contains('app-dark')).toBe(true);
        });

        it('should remove app-dark class from document on toggleDarkMode() when disabling', () => {
            service.toggleDarkMode(); // enable
            service.toggleDarkMode(); // disable

            expect(document.documentElement.classList.contains('app-dark')).toBe(false);
        });
    });

    describe('mobile sidebar', () => {
        it('should default to mobileSidebarOpen false', () => {
            expect(service.mobileSidebarOpen()).toBe(false);
        });

        it('should toggle mobileSidebarOpen on toggleMobileSidebar()', () => {
            service.toggleMobileSidebar();
            expect(service.mobileSidebarOpen()).toBe(true);

            service.toggleMobileSidebar();
            expect(service.mobileSidebarOpen()).toBe(false);
        });

        it('should set mobileSidebarOpen to false on closeMobileSidebar()', () => {
            service.toggleMobileSidebar(); // open it first
            expect(service.mobileSidebarOpen()).toBe(true);

            service.closeMobileSidebar();

            expect(service.mobileSidebarOpen()).toBe(false);
        });

        it('should be a no-op when closeMobileSidebar() is called while already closed', () => {
            expect(service.mobileSidebarOpen()).toBe(false);

            service.closeMobileSidebar();

            expect(service.mobileSidebarOpen()).toBe(false);
        });
    });
});
