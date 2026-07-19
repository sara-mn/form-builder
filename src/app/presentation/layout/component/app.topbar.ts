import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';
import { AuthFacade } from '@app/presentation/features/auth/services/auth.facade';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, StyleClassModule, NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img [ngSrc]="'assets/layout/images/formbuilder.png'" alt="formBuilder" height="33" width="34" />
                <span>Form Builder</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <div class="btn btn-outline" (click)="logout()">logout</div>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(
        public layoutService: LayoutService,
        private authFacade: AuthFacade,
        private router: Router
    ) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    logout() {
        this.authFacade.logout();
        this.router.navigate(['/login']).then();
    }
}
