import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { FormListItem } from '@app/application/form/get-forms-with-submission-counts.use-case';
import { FormStatusEnum } from '@app/domain';
import { RecentForms } from './recent-forms';

describe('RecentForms', () => {
    let fixture: ComponentFixture<RecentForms>;

    const buildItem = (id: string, updatedAt: string): FormListItem => ({
        form: {
            id,
            title: `Form ${id}`,
            description: '',
            status: FormStatusEnum.Draft,
            ownerId: 'u1',
            pages: [],
            validators: [],
            createdAt: updatedAt,
            updatedAt
        },
        submissionCount: 0
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecentForms],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(RecentForms);
    });

    it('should link each row to the edit page of its form', () => {
        fixture.componentRef.setInput('items', [buildItem('f1', '2025-01-01T00:00:00.000Z')]);
        fixture.detectChanges();

        const link = fixture.debugElement.query(By.css('li a')).nativeElement as HTMLAnchorElement;
        expect(link.getAttribute('href')).toBe('/forms/f1/edit');
    });

    it('should show only the 5 most recently updated forms, newest first', () => {
        const items = [1, 2, 3, 4, 5, 6].map((n) => buildItem(`f${n}`, `2025-01-0${n}T00:00:00.000Z`));
        fixture.componentRef.setInput('items', items);
        fixture.detectChanges();

        const links = fixture.debugElement.queryAll(By.css('li a'));
        expect(links.length).toBe(5);
        expect((links[0].nativeElement as HTMLAnchorElement).getAttribute('href')).toBe('/forms/f6/edit');
    });

    it('should link rows to the fill page when the user cannot edit', () => {
        fixture.componentRef.setInput('items', [buildItem('f1', '2025-01-01T00:00:00.000Z')]);
        fixture.componentRef.setInput('canEdit', false);
        fixture.detectChanges();

        const link = fixture.debugElement.query(By.css('li a')).nativeElement as HTMLAnchorElement;
        expect(link.getAttribute('href')).toBe('/forms/f1/fill');
    });

    it('should hide submission counts when showSubmissionCounts is false', () => {
        fixture.componentRef.setInput('items', [buildItem('f1', '2025-01-01T00:00:00.000Z')]);
        fixture.componentRef.setInput('showSubmissionCounts', false);
        fixture.detectChanges();

        expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('submissions');
    });

    it('should link to the full form list', () => {
        fixture.componentRef.setInput('items', []);
        fixture.detectChanges();

        const viewAll = fixture.debugElement.query(By.css('a[href="/form-list"]'));
        expect(viewAll).not.toBeNull();
    });
});
