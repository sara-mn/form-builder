import { Component, input, InputSignal, OnInit } from '@angular/core';
import { FieldConfigModel, FieldTypeEnum } from '@app/domain';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.scss',
  standalone: false
})
export class DynamicFieldComponent implements OnInit {
  initialConfig: FieldConfigModel = {
    name: 'name',
    label: 'label',
    type: FieldTypeEnum.Text
  };

  fieldTypeEnum = FieldTypeEnum;

  fieldInput: InputSignal<FieldConfigModel> = input<FieldConfigModel>(this.initialConfig, { alias: 'field' });    // ===>>>  @Input('field-data') config: FieldConfigModel;
  formControlInput: InputSignal<AbstractControl> = input<AbstractControl>(new FormControl(''), { alias: 'form-control' });
  field!: FieldConfigModel;
  formControl!: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.field = this.fieldInput();
    this.formControl = this.formControlInput() as FormControl;
  }

}
