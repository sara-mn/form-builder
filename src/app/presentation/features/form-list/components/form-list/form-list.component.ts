import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-form-list',
    imports: [Button, RouterLink],
    templateUrl: './form-list.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './form-list.component.scss'
})
export class FormListComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    createNewForm() {
        this.router.navigateByUrl('/form-entry').then();
    }
}
