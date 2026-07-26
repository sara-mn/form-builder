import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Topbar } from './topbar/topbar';
import { Footer } from './footer/footer';
import { ShellState } from './shell-state';

@Component({
    selector: 'app-shell',
    imports: [RouterOutlet, Topbar, Sidebar, Footer],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './shell.html',
    styleUrl: './shell.scss'
})
export class Shell {
    protected readonly shellState = inject(ShellState);
}
