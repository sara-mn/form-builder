import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-form-list',
  imports: [
    Button
  ],
  templateUrl: './form-list.component.html',
  standalone: true,
  styleUrl: './form-list.component.scss'
})
export class FormListComponent {
  createNewForm() {
  }
}
