import { Component, OnInit } from '@angular/core';
import { FormSchemaModel } from '@app/domain';
import { FormCreatorService } from '@features/form-renderer/form-creator.service';
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
        type: 'text'
      }, {
        name: 'lastName',
        label: 'نام خانوادگی',
        type: 'text'
      }, {
        name: 'nationalCode',
        label: 'کد ملی',
        type: 'number'
      },
      {
        name: 'gender',
        label: 'جنسیت',
        type: 'select',
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
