import { Component, input, OnInit, output } from '@angular/core';
import { FieldConfigModel } from '@app/domain';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-field-list',
  imports: [
    Button
  ],
  templateUrl: './field-list.component.html',
  standalone: true,
  styleUrl: './field-list.component.scss'
})
export class FieldListComponent implements OnInit {
  list: FieldConfigModel[] = [];
  fields = input<FieldConfigModel[]>();
  update = output<{ index: number, field: FieldConfigModel }>();
  delete = output<number>();
  preview = output<FieldConfigModel>();

  constructor() {
  }

  ngOnInit(): void {
    this.list = this.fields() || [];
  }

  updateField(index: number, field: FieldConfigModel) {
    this.update.emit({ index, field });
  }

  deleteField(index: number) {
    this.delete.emit(index)
  }

  previewField(field: FieldConfigModel) {
    this.preview.emit(field)
  }
}
