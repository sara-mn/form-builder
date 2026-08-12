import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PIcon } from '@primeicons/angular';
import { NavItemModel } from '../nav-item.model';

@Component({
    selector: 'app-nav-item',
    imports: [RouterLink, RouterLinkActive, PIcon, NavItem],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './nav-item.html',
    styleUrl: './nav-item.scss'
})
export class NavItem {
    @Input({ required: true }) item!: NavItemModel;
    @Input() root: boolean = false;

    protected readonly expanded = signal(false);

    toggle(): void {
        this.expanded.update((value) => !value);
    }
}
