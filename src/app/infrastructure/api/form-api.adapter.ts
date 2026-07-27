import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { FormRepository } from '@domain/form/abstracts/form.repository.abstract';
import { FormModel } from '@app/domain/form/models/form.model';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class FormApiAdapter implements FormRepository {
    private formsUrl = `${environment.apiUrl}/forms`;

    constructor(private httpClient: HttpClient) {}

    getFormById(formId: string): Promise<FormModel> {
        const $res: Observable<FormModel> = this.httpClient.get<FormModel>(`${this.formsUrl}/${formId}`);
        return lastValueFrom($res);
    }
}
