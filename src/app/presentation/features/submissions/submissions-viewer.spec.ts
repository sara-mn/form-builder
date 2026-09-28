import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { SubmissionsViewer } from './submissions-viewer';
import { SubmissionsFacade } from './services/submissions.facade';
import { FormModel, FormStatusEnum } from '@app/domain';
import { FormSubmissionModel } from '@app/domain/form/models/form-submission.model';

describe('SubmissionsViewer', () => {
    let component: SubmissionsViewer;
    let fixture: ComponentFixture<SubmissionsViewer>;
    let facade: Pick<SubmissionsFacade, 'load' | 'form' | 'submissions' | 'fieldLookup'>;

    const fakeForm: FormModel = {
        id: 'form-1',
        title: 'Job Application',
        description: '',
        status: FormStatusEnum.Published,
        ownerId: 'user-1',
        pages: [],
        validators: [],
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z'
    };

    const fakeSubmission: FormSubmissionModel = {
        id: 'sub-1',
        formId: 'form-1',
        submittedBy: 'user-2',
        submittedAt: '2025-06-01T09:00:00.000Z',
        answers: { 'field-1': 'Elena Fischer' }
    };

    beforeEach(async () => {
        facade = {
            load: vi.fn().mockResolvedValue(undefined),
            form: signal(fakeForm),
            submissions: signal([fakeSubmission]),
            fieldLookup: signal([{ id: 'field-1', label: 'Full Name' }])
        };

        await TestBed.configureTestingModule({
            imports: [SubmissionsViewer],
            providers: [
                { provide: SubmissionsFacade, useValue: facade },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'form-1' } } } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SubmissionsViewer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call facade.load with the route form id on init', () => {
        expect(facade.load).toHaveBeenCalledWith('form-1');
    });

    it('should render one row per submission', () => {
        const rows = fixture.nativeElement.querySelectorAll('tbody tr');
        expect(rows.length).toBe(1);
    });

    describe('onView', () => {
        it('should build the answers view from fieldLookup for the selected submission', () => {
            component['onView']('sub-1');

            expect(component['selectedAnswers']()).toEqual([{ label: 'Full Name', value: 'Elena Fischer' }]);
        });
    });

    describe('onCloseDetail', () => {
        it('should clear the selected submission and its answers', () => {
            component['onView']('sub-1');
            component['onCloseDetail']();

            expect(component['selectedAnswers']()).toEqual([]);
        });
    });
});
