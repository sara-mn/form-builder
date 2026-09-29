import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html'
})
export class App implements OnInit {
    title = 'form-builder';

    constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}
