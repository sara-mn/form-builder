import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
        <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
    </ul> `
})
export class AppMenu {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
      },
      {
        label: 'Form Designer',
        items: [
          { label: 'Form Schema', icon: 'pi pi-fw pi-id-card', routerLink: ['/create-form'] },
          { label: 'Field List', icon: 'pi pi-fw pi-check-square', routerLink: ['/'] },
        ]
      },
      {
        label: 'Form Renderer',
        items: [
          { label: 'Form Preview', icon: 'pi pi-fw pi-id-card', routerLink: ['/dynamic-form'] },
          { label: 'item1', icon: 'pi pi-fw pi-check-square', routerLink: ['/'] },
          { label: 'item2', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/'] }
        ]
      }
    ];
  }
}
