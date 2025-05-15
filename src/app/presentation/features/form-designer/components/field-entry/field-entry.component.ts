import { Component, OnInit } from '@angular/core';
import { FieldConfigFormService } from '@features/form-designer/services/field-config-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { Select } from 'primeng/select';
import { FieldTypeEnum } from '@app/domain';
import { Button } from 'primeng/button';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-field-entry',
  imports: [
    ReactiveFormsModule,
    InputText,
    Checkbox,
    Select,
    Button,
    MultiSelect
  ],
  templateUrl: './field-entry.component.html',
  standalone: true,
  styleUrl: './field-entry.component.scss'
})
export class FieldEntryComponent implements OnInit {
  form!: FormGroup;
  fieldTypes!: FieldTypeEnum[];

  constructor(private fieldConfigFormService: FieldConfigFormService) {
  }

  ngOnInit() {
    this.form = this.fieldConfigFormService.createForm();
    this.fieldTypes = [
      FieldTypeEnum.Text,
      FieldTypeEnum.Number,
      FieldTypeEnum.Select
    ];
  }

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.fieldConfigFormService.getRawValue(this.form);
  }

}
