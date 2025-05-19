import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, NgOptimizedImage],
    template: `
      <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
          <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars"></i>
          </button>
          <a class="layout-topbar-logo" routerLink="/">
            <img [ngSrc]="'assets/layout/images/formbuilder.png'" alt="formBuilder" height="33" width="34"/>
            <span>Form Builder</span>
          </a>
        </div>

        <div class="layout-topbar-actions">
          <div class="layout-topbar-menu hidden lg:block">
            <div class="layout-topbar-menu-content">
              <button type="button" class="layout-topbar-action">
                <i class="pi pi-user"></i>
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
