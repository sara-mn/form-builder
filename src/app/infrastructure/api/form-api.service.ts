import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { FormService } from '@domain/form/abstracts/form-service.abstract';
import { FormSchemaModel } from '@domain/form/models/form-schema.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FormApiService implements FormService {

  private formsUrl = `${environment.apiUrl}/forms`;

  constructor(private httpClient: HttpClient) {
  }

  getFormById(formId: string): Promise<FormSchemaModel> {
    const $res: Observable<FormSchemaModel> = this.httpClient.get<FormSchemaModel>(`${this.formsUrl}/${formId}`);
    return lastValueFrom($res);
  }
}
