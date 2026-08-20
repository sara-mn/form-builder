import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Lock } from '@primeicons/angular/lock';

@Component({
    selector: 'app-unauthorized',
    imports: [RouterLink, ButtonModule, Lock],
    templateUrl: './unauthorized.html'
})
export class Unauthorized {}
