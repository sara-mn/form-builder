import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { FormRepository } from '@domain/form/abstracts/form.repository.abstract';
import { FormModel } from '@app/domain/form/models/form.model';
import { environment } from '@env/environment';
import { Guid } from '@app/domain';

@Injectable({
    providedIn: 'root'
})
export class FormApiAdapter implements FormRepository {
    private formsUrl = `${environment.apiUrl}/forms`;

    constructor(private httpClient: HttpClient) {}
    getAllForms(): Promise<FormModel[]> {
        const $res: Observable<FormModel[]> = this.httpClient.get<FormModel[]>(this.formsUrl);
        return lastValueFrom($res);
    }

    getFormById(formId: string): Promise<FormModel> {
        const $res: Observable<FormModel> = this.httpClient.get<FormModel>(`${this.formsUrl}/${formId}`);
        return lastValueFrom($res);
    }

    createForm(form: Omit<FormModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<FormModel> {
        const $res: Observable<FormModel> = this.httpClient.post<FormModel>(this.formsUrl, form);
        return lastValueFrom($res);
    }
    updateForm(formId: Guid, form: Partial<FormModel>): Promise<FormModel> {
        const $res: Observable<FormModel> = this.httpClient.put<FormModel>(`${this.formsUrl}/${formId}`, form);
        return lastValueFrom($res);
    }
    deleteForm(formId: Guid): Promise<void> {
        const $res: Observable<void> = this.httpClient.delete<void>(`${this.formsUrl}/${formId}`);
        return lastValueFrom($res);
    }
}
