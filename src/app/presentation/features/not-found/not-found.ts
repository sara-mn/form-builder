import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-not-found',
    imports: [ButtonModule, RouterLink],
    templateUrl: './not-found.html'
})
export class NotFound {}
