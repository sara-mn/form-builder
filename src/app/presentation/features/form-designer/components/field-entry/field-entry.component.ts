import { Component, input, model, OnInit, output } from '@angular/core';
import { FieldConfigFormService } from '@features/form-designer/services/field-config-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { Select } from 'primeng/select';
import { FieldConfigModel, FieldTypeEnum } from '@app/domain';
import { Button } from 'primeng/button';
import { MultiSelect } from 'primeng/multiselect';
import { FieldTypeLabel } from '@shared/enum-records/field-type.label';
import { Fieldset } from 'primeng/fieldset';

@Component({
  selector: 'app-field-entry',
  imports: [
    ReactiveFormsModule,
    InputText,
    Checkbox,
    Select,
    Button,
    Fieldset
  ],
  templateUrl: './field-entry.component.html',
  standalone: true,
  styleUrl: './field-entry.component.scss'
})
export class FieldEntryComponent implements OnInit {
  fieldsetTitle: string = 'New Field';
  form!: FormGroup;
  fieldTypes: { label: string; value: FieldTypeEnum }[] = [];
  fieldTypeEnums = Object.keys(FieldTypeLabel);
  enterField = output<FieldConfigModel>();
  field = input<FieldConfigModel>();

  constructor(private fieldConfigFormService: FieldConfigFormService) {
  }

  ngOnInit() {
    this.form = this.fieldConfigFormService.createForm();
    const field = this.field();
    if (field !== undefined) {
      this.fieldsetTitle = 'Update Field'
      this.form.patchValue(field);
    }
    this.fieldTypes = this.fieldTypeEnums.map((item) => {
      return {
        label: FieldTypeLabel[item as FieldTypeEnum].en,
        value: item as FieldTypeEnum
      };
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.fieldConfigFormService.getRawValue(this.form);
    this.enterField.emit(raw);
  }

  protected readonly FieldTypeEnum = FieldTypeEnum;
}
