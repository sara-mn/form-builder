import { Component, OnInit } from '@angular/core';
import { FieldTypeEnum, FormSchemaModel, UserRoleEnum, ValidationConfigModel } from '@app/domain';
import { FormCreatorService } from '@features/form-renderer/services/form-creator.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  standalone: false
})
export class DynamicFormComponent implements OnInit {
  formJson: FormSchemaModel = {
    fields: [
      {
        name: 'firstName',
        label: 'نام',
        type: FieldTypeEnum.Text,
        required: true,
        validations: [],
        access: []
      }, {
        name: 'lastName',
        label: 'نام خانوادگی',
        type: FieldTypeEnum.Text,
        required: true,
        validations: [],
        access: []
      }, {
        name: 'nationalCode',
        label: 'کد ملی',
        type: FieldTypeEnum.Number,
        required: true,
        validations: [],
        access: []
      },
      {
        name: 'gender',
        label: 'جنسیت',
        type: FieldTypeEnum.Select,
        required: true,
        validations: [],
        access: [],
        options: [
          {
            key: 'male',
            value: 'مرد'
          }, {
            key: 'female',
            value: 'زن'
          }
        ]
      }
    ],
    id: '1',
    title: 'initial form'
  };
  form!: FormGroup;

  constructor(private formCreatorService: FormCreatorService) {
  }

  ngOnInit() {
    this.form = this.formCreatorService.createForm(this.formJson.fields);
  }

}
