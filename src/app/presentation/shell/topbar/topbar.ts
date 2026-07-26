import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ShellState } from '../shell-state';
import { AuthState } from '@app/presentation/core/services/auth-state';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';
import { PIcon } from '@primeicons/angular';

@Component({
    selector: 'app-topbar',
    imports: [RouterLink, NgOptimizedImage, ButtonModule, PIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './topbar.html',
    styleUrl: './topbar.scss'
})
export class Topbar {
    protected readonly shellState = inject(ShellState);
    protected readonly authState = inject(AuthState);

    private readonly authFacade = inject(AuthFacade);
    private readonly router = inject(Router);

    logout(): void {
        this.authFacade.logout().then(() => {
            this.router.navigate(['/login']);
        });
    }
}
