import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavItem } from './nav-item/nav-item';
import { NAV_ITEMS } from './nav-items';
import { ShellState } from '../../shell-state';

@Component({
    selector: 'app-sidebar',
    imports: [NavItem],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './sidebar.html'
})
export class Sidebar {
    protected readonly shellState = inject(ShellState);
    protected readonly navItems = NAV_ITEMS;
}
