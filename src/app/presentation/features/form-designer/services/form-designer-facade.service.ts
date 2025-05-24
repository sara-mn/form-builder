import { Injectable } from '@angular/core';
import { FormSchemaModel } from '@app/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDesignerFacadeService {

  constructor() {
  }

  getFormById(formId: string): Observable<FormSchemaModel> {
    return new Observable((subscriber) => {
      subscriber.next({ title: 'form Id 1', fields: [] });
    });
  }

}
