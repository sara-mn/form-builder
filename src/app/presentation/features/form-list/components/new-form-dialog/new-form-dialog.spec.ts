import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewFormDialog, NewFormData } from './new-form-dialog';

describe('NewFormDialog', () => {
    let component: NewFormDialog;
    let fixture: ComponentFixture<NewFormDialog>;

    function setup(isOpen = true) {
        TestBed.configureTestingModule({
            imports: [NewFormDialog]
        });
        fixture = TestBed.createComponent(NewFormDialog);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('isOpen', isOpen);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should default title and description to empty strings', () => {
        setup();
        expect(component.title()).toBe('');
        expect(component.description()).toBe('');
    });

    describe('onSave', () => {
        it('should not emit "saved" when title is empty', () => {
            setup();
            const savedSpy = vi.fn();
            component.saved.subscribe(savedSpy);

            component.onSave();

            expect(savedSpy).not.toHaveBeenCalled();
        });

        it('should not emit "saved" when title is only whitespace', () => {
            setup();
            const savedSpy = vi.fn();
            component.saved.subscribe(savedSpy);
            component.title.set('   ');

            component.onSave();

            expect(savedSpy).not.toHaveBeenCalled();
        });

        it('should emit "saved" with title and description when title is valid', () => {
            setup();
            const savedSpy = vi.fn();
            component.saved.subscribe(savedSpy);
            component.title.set('My Form');
            component.description.set('A description');

            component.onSave();

            const expected: NewFormData = { title: 'My Form', description: 'A description' };
            expect(savedSpy).toHaveBeenCalledWith(expected);
        });

        it('should reset title and description after a successful save', () => {
            setup();
            component.title.set('My Form');
            component.description.set('A description');

            component.onSave();

            expect(component.title()).toBe('');
            expect(component.description()).toBe('');
        });
    });

    describe('onDialogHide', () => {
        it('should emit "closed"', () => {
            setup();
            const closedSpy = vi.fn();
            component.closed.subscribe(closedSpy);

            component.onDialogHide();

            expect(closedSpy).toHaveBeenCalled();
        });

        it('should reset title and description', () => {
            setup();
            component.title.set('Draft title');
            component.description.set('Draft description');

            component.onDialogHide();

            expect(component.title()).toBe('');
            expect(component.description()).toBe('');
        });
    });

    describe('template interaction', () => {
        it('should update the title model when typing in the title input', () => {
            setup();
            const titleInput = fixture.nativeElement.querySelector('#new-form-title') as HTMLInputElement;
            titleInput.value = 'Typed Title';
            titleInput.dispatchEvent(new Event('input'));

            expect(component.title()).toBe('Typed Title');
        });

        it('should update the description model when typing in the description textarea', () => {
            setup();
            const descTextarea = fixture.nativeElement.querySelector('#new-form-description') as HTMLTextAreaElement;
            descTextarea.value = 'Typed description';
            descTextarea.dispatchEvent(new Event('input'));

            expect(component.description()).toBe('Typed description');
        });

        it('should call onSave when the Create button is clicked', () => {
            setup();
            const saveSpy = vi.spyOn(component, 'onSave');
            component.title.set('Valid Title');
            fixture.detectChanges();

            const buttons = fixture.nativeElement.querySelectorAll('button');
            const createButton = Array.from(buttons).find((b: any) => b.textContent.trim() === 'Create') as HTMLButtonElement;
            createButton.click();

            expect(saveSpy).toHaveBeenCalled();
        });

        it('should call onDialogHide when the Cancel button is clicked', () => {
            setup();
            const hideSpy = vi.spyOn(component, 'onDialogHide');

            const buttons = fixture.nativeElement.querySelectorAll('button');
            const cancelButton = Array.from(buttons).find((b: any) => b.textContent.trim() === 'Cancel') as HTMLButtonElement;
            cancelButton.click();

            expect(hideSpy).toHaveBeenCalled();
        });
    });
});
