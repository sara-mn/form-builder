import { Injectable } from '@angular/core';
import { FieldTypeEnum, FormSchemaModel, UserRoleEnum } from '@app/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDesignerFacadeService {

  constructor() {
  }

  getFormById(formId: string): Observable<FormSchemaModel> {
    return new Observable((subscriber) => {
      subscriber.next({ title: 'form Id 1', fields: [ {
          name: 'firstName',
          label: 'نام',
          type: FieldTypeEnum.Text,
          required: true,
          validation: {
            'minLength': 3,
            'maxLength': 15,
            'required': true
          },
          access: [UserRoleEnum.Guest, UserRoleEnum.User]
        }, {
          name: 'lastName',
          label: 'نام خانوادگی',
          type: FieldTypeEnum.Text,
          required: true,
          validation: {
            'minLength': 3,
            'maxLength': 15,
            'required': true
          },
          access: [UserRoleEnum.Guest, UserRoleEnum.User]
        }, {
          name: 'nationalCode',
          label: 'کد ملی',
          type: FieldTypeEnum.Number,
          required: true,
          validation: {
            'required': true
          },
          access: [UserRoleEnum.Guest, UserRoleEnum.User]
        },
          {
            name: 'gender',
            label: 'جنسیت',
            type: FieldTypeEnum.Select,
            required: true,
            validation: {
              'required': false
            },
            access: [UserRoleEnum.Guest, UserRoleEnum.User],
            options: [
              {
                key: 'male',
                value: 'مرد'
              }, {
                key: 'female',
                value: 'زن'
              }
            ]
          }] });
    });
  }

}
