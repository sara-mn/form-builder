import { Component, OnInit } from '@angular/core';
import { FormSchemaModel } from '@app/domain';
import { FormCreatorService } from '@features/form-renderer/form-creator.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit{
  form: FormSchemaModel = {
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
        options:[
          {
            key: 'male',
            value: 'مرد'
          },{
            key: 'female',
            value: 'زن'
          }
        ]
      }
    ],
    id: '1',
    title: 'initial form'
  }

  constructor(private formCreatorService : FormCreatorService) {
  }
   ngOnInit() {
    this.formCreatorService.createForm(this.form.fields);
   }

}
