import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMetadataPanel, MetadataChange } from './form-metadata-panel';

describe('FormMetadataPanel', () => {
    let fixture: ComponentFixture<FormMetadataPanel>;
    let component: FormMetadataPanel;

    function setup(title = 'My Form', description = 'A description', disabled = false) {
        TestBed.configureTestingModule({
            imports: [FormMetadataPanel]
        });
        fixture = TestBed.createComponent(FormMetadataPanel);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('title', title);
        fixture.componentRef.setInput('description', description);
        fixture.componentRef.setInput('disabled', disabled);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should render the current title and description as input values', () => {
        setup('My Form', 'A description');
        const titleInput = fixture.nativeElement.querySelector('#form-title') as HTMLInputElement;
        const descInput = fixture.nativeElement.querySelector('#form-description') as HTMLInputElement;
        expect(titleInput.value).toBe('My Form');
        expect(descInput.value).toBe('A description');
    });

    it('should disable both inputs when disabled is true', () => {
        setup('My Form', 'A description', true);
        const titleInput = fixture.nativeElement.querySelector('#form-title') as HTMLInputElement;
        const descInput = fixture.nativeElement.querySelector('#form-description') as HTMLInputElement;
        expect(titleInput.disabled).toBe(true);
        expect(descInput.disabled).toBe(true);
    });

    describe('onTitleChange', () => {
        it('should emit metadataChanged with the new title and current description', () => {
            setup('Old Title', 'Some description');
            const emitSpy = vi.fn();
            component.metadataChanged.subscribe(emitSpy);

            component.onTitleChange('New Title');

            const expected: MetadataChange = { title: 'New Title', description: 'Some description' };
            expect(emitSpy).toHaveBeenCalledWith(expected);
        });

        it('should emit when the user types in the title input', () => {
            setup('Old Title', 'Some description');
            const emitSpy = vi.fn();
            component.metadataChanged.subscribe(emitSpy);

            const titleInput = fixture.nativeElement.querySelector('#form-title') as HTMLInputElement;
            titleInput.value = 'Typed Title';
            titleInput.dispatchEvent(new Event('input'));

            expect(emitSpy).toHaveBeenCalledWith({ title: 'Typed Title', description: 'Some description' });
        });
    });

    describe('onDescriptionChange', () => {
        it('should emit metadataChanged with the current title and new description', () => {
            setup('My Title', 'Old description');
            const emitSpy = vi.fn();
            component.metadataChanged.subscribe(emitSpy);

            component.onDescriptionChange('New description');

            const expected: MetadataChange = { title: 'My Title', description: 'New description' };
            expect(emitSpy).toHaveBeenCalledWith(expected);
        });

        it('should emit when the user types in the description input', () => {
            setup('My Title', 'Old description');
            const emitSpy = vi.fn();
            component.metadataChanged.subscribe(emitSpy);

            const descInput = fixture.nativeElement.querySelector('#form-description') as HTMLInputElement;
            descInput.value = 'Typed description';
            descInput.dispatchEvent(new Event('input'));

            expect(emitSpy).toHaveBeenCalledWith({ title: 'My Title', description: 'Typed description' });
        });
    });
});
