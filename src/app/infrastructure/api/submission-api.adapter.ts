import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { SubmissionRepository } from '@app/domain/form/abstracts/submission.repository.abstract';
import { FormSubmissionModel } from '@app/domain/form/models/form-submission.model';
import { environment } from '@env/environment';
import { lastValueFrom, Observable, map } from 'rxjs';
import { Guid } from '@app/domain';

@Service()
export class SubmissionApiAdapter implements SubmissionRepository {
    private submissionsUrl = `${environment.apiUrl}/submissions`;
    private httpClient = inject(HttpClient);

    getSubmission(formId: Guid, userId: Guid): Promise<FormSubmissionModel | null> {
        const $res: Observable<FormSubmissionModel | null> = this.httpClient.get<FormSubmissionModel[]>(this.submissionsUrl, { params: { formId, submittedBy: userId } }).pipe(map((results) => results[0] ?? null));
        return lastValueFrom($res);
    }

    getAllSubmissions(): Promise<FormSubmissionModel[]> {
        const $res: Observable<FormSubmissionModel[]> = this.httpClient.get<FormSubmissionModel[]>(this.submissionsUrl);
        return lastValueFrom($res);
    }

    getSubmissionsByFormId(formId: Guid): Promise<FormSubmissionModel[]> {
        const $res: Observable<FormSubmissionModel[]> = this.httpClient.get<FormSubmissionModel[]>(this.submissionsUrl, { params: { formId } });
        return lastValueFrom($res);
    }

    createSubmission(submission: Omit<FormSubmissionModel, 'id' | 'submittedAt'>): Promise<FormSubmissionModel> {
        const payload = { ...submission, submittedAt: new Date().toISOString() };
        const $res: Observable<FormSubmissionModel> = this.httpClient.post<FormSubmissionModel>(this.submissionsUrl, payload);
        return lastValueFrom($res);
    }
}
