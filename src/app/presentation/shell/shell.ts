import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './components/topbar/topbar';
import { Footer } from './components/footer/footer';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
    selector: 'app-shell',
    imports: [RouterOutlet, Topbar, Sidebar, Footer],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './shell.html'
})
export class Shell {}
