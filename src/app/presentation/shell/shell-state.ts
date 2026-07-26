import { computed, Service, signal } from '@angular/core';

@Service()
export class ShellState {
    private readonly _darkTheme = signal<boolean>(false);
    private readonly _mobileSidebarOpen = signal<boolean>(false);

    readonly darkTheme = this._darkTheme.asReadonly();
    readonly mobileSidebarOpen = this._mobileSidebarOpen.asReadonly();

    readonly theme = computed(() => (this._darkTheme() ? 'dark' : 'light'));

    toggleDarkMode(): void {
        this._darkTheme.update((value) => !value);
        this.applyDarkModeClass();
    }

    toggleMobileSidebar(): void {
        this._mobileSidebarOpen.update((value) => !value);
    }

    closeMobileSidebar(): void {
        this._mobileSidebarOpen.set(false);
    }

    private applyDarkModeClass(): void {
        document.documentElement.classList.toggle('app-dark', this._darkTheme());
    }
}
