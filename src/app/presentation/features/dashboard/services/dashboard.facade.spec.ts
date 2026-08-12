import { TestBed } from '@angular/core/testing';
import { DashboardFacade } from './dashboard.facade';
import { GetFormsWithSubmissionCountsUseCase, FormListItem } from '@app/application/form/get-forms-with-submission-counts.use-case';
import { FormStatusEnum } from '@app/domain';
import { createFakeForm } from '@app/application/test-utils';

describe('DashboardFacade', () => {
    let facade: DashboardFacade;
    let useCase: Pick<GetFormsWithSubmissionCountsUseCase, 'execute'>;

    beforeEach(() => {
        useCase = { execute: vi.fn() };

        TestBed.configureTestingModule({
            providers: [{ provide: GetFormsWithSubmissionCountsUseCase, useValue: useCase }]
        });

        facade = TestBed.inject(DashboardFacade);
    });

    it('should be created', () => {
        expect(facade).toBeTruthy();
    });

    it('should default to zeroed stats before loading', () => {
        expect(facade.stats()).toEqual({
            totalForms: 0,
            publishedForms: 0,
            draftForms: 0,
            lockedForms: 0,
            totalSubmissions: 0
        });
    });

    it('should compute stats from the loaded form list items', async () => {
        const items: FormListItem[] = [
            { form: createFakeForm({ status: FormStatusEnum.Published }), submissionCount: 3 },
            { form: createFakeForm({ status: FormStatusEnum.Published }), submissionCount: 0 },
            { form: createFakeForm({ status: FormStatusEnum.Draft }), submissionCount: 0 },
            { form: createFakeForm({ status: FormStatusEnum.Draft }), submissionCount: 5 }
        ];
        (useCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(items);

        await facade.loadStats();

        expect(facade.stats()).toEqual({
            totalForms: 4,
            publishedForms: 2,
            draftForms: 2,
            lockedForms: 2,
            totalSubmissions: 8
        });
    });

    it('should treat any form with at least one submission as locked, regardless of status', async () => {
        const items: FormListItem[] = [{ form: createFakeForm({ status: FormStatusEnum.Draft }), submissionCount: 1 }];
        (useCase.execute as ReturnType<typeof vi.fn>).mockResolvedValue(items);

        await facade.loadStats();

        expect(facade.stats().lockedForms).toBe(1);
    });
});
