import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { StatusBadge } from './status-badge';
import { FormStatusEnum } from '@app/domain/form/enums/form-status.enum';

describe('StatusBadge', () => {
    let fixture: ComponentFixture<StatusBadge>;
    let component: StatusBadge;

    function setup(status: FormStatusEnum, isLocked = false) {
        TestBed.configureTestingModule({
            imports: [StatusBadge]
        });
        fixture = TestBed.createComponent(StatusBadge);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('status', status);
        fixture.componentRef.setInput('isLocked', isLocked);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup(FormStatusEnum.Draft);
        expect(component).toBeTruthy();
    });

    describe('label', () => {
        it('should show "Draft" for draft status', () => {
            setup(FormStatusEnum.Draft);
            expect(component.label()).toBe('Draft');
        });

        it('should show "Published" for published status', () => {
            setup(FormStatusEnum.Published);
            expect(component.label()).toBe('Published');
        });

        it('should show "Locked" regardless of status when isLocked is true', () => {
            setup(FormStatusEnum.Published, true);
            expect(component.label()).toBe('Locked');
        });
    });

    describe('severity', () => {
        it('should be "secondary" for draft status', () => {
            setup(FormStatusEnum.Draft);
            expect(component.severity()).toBe('secondary');
        });

        it('should be "success" for published status', () => {
            setup(FormStatusEnum.Published);
            expect(component.severity()).toBe('success');
        });

        it('should be "danger" when locked, regardless of status', () => {
            setup(FormStatusEnum.Draft, true);
            expect(component.severity()).toBe('danger');
        });
    });

    describe('rendered template', () => {
        it('should render a p-tag with the computed label', () => {
            setup(FormStatusEnum.Published);
            const tagEl = fixture.nativeElement.querySelector('p-tag');
            expect(tagEl).toBeTruthy();
        });
    });
});
