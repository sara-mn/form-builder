import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { PageSidebar } from './page-sidebar';
import { FormPageModel } from '@app/domain';

describe('PageSidebar', () => {
    let fixture: ComponentFixture<PageSidebar>;
    let component: PageSidebar;

    const page1: FormPageModel = { id: 'p1', title: 'Page 1', order: 0, fields: [], validators: [] };
    const page2: FormPageModel = { id: 'p2', title: 'Page 2', order: 1, fields: [], validators: [] };

    function setup(pages: FormPageModel[] = [page1, page2], selectedPageId: string | null = null, disabled = false) {
        TestBed.configureTestingModule({
            imports: [PageSidebar]
        });
        fixture = TestBed.createComponent(PageSidebar);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('pages', pages);
        fixture.componentRef.setInput('selectedPageId', selectedPageId);
        fixture.componentRef.setInput('disabled', disabled);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should render one list item per page', () => {
        setup();
        const items = fixture.nativeElement.querySelectorAll('li');
        expect(items.length).toBe(2);
    });

    it('should show the empty message when there are no pages', () => {
        setup([]);
        expect(fixture.nativeElement.textContent).toContain('No pages yet.');
    });

    it('should highlight the selected page', () => {
        setup([page1, page2], 'p2');
        const items = fixture.nativeElement.querySelectorAll('li');
        expect(items[1].className).toContain('bg-primary-50');
        expect(items[0].className).not.toContain('bg-primary-50');
    });

    it('should emit pageSelected when a page is clicked', () => {
        setup();
        const emitSpy = vi.fn();
        component.pageSelected.subscribe(emitSpy);

        const items = fixture.nativeElement.querySelectorAll('li');
        items[0].click();

        expect(emitSpy).toHaveBeenCalledWith('p1');
    });

    it('should emit pageAdded when the Add Page button is clicked', () => {
        setup();
        const emitSpy = vi.fn();
        component.pageAdded.subscribe(emitSpy);

        const addButton = fixture.nativeElement.querySelector('button');
        addButton.click();

        expect(emitSpy).toHaveBeenCalled();
    });

    it('should disable the Add Page button when disabled is true', () => {
        setup([page1, page2], null, true);
        const addButton = fixture.nativeElement.querySelector('button');
        expect(addButton.disabled).toBe(true);
    });

    describe('onDelete', () => {
        it('should open a confirmation dialog without emitting pageDeleted immediately', () => {
            setup();
            const confirmationService = fixture.debugElement.injector.get(ConfirmationService);
            const confirmSpy = vi.spyOn(confirmationService, 'confirm');
            const emitSpy = vi.fn();
            component.pageDeleted.subscribe(emitSpy);

            const fakeEvent = { stopPropagation: vi.fn() } as unknown as Event;
            component.onDelete('p1', fakeEvent);

            expect(confirmSpy).toHaveBeenCalled();
            expect(emitSpy).not.toHaveBeenCalled();
        });

        it('should stop event propagation to avoid triggering page selection', () => {
            setup();
            const fakeEvent = { stopPropagation: vi.fn() } as unknown as Event;
            component.onDelete('p1', fakeEvent);
            expect(fakeEvent.stopPropagation).toHaveBeenCalled();
        });

        it('should emit pageDeleted only after the user accepts the confirmation', () => {
            setup();
            const confirmationService = fixture.debugElement.injector.get(ConfirmationService);
            const confirmSpy = vi.spyOn(confirmationService, 'confirm');
            const emitSpy = vi.fn();
            component.pageDeleted.subscribe(emitSpy);

            const fakeEvent = { stopPropagation: vi.fn() } as unknown as Event;
            component.onDelete('p1', fakeEvent);

            const acceptCallback = confirmSpy.mock.calls[0][0].accept;
            acceptCallback?.();

            expect(emitSpy).toHaveBeenCalledWith('p1');
        });
    });
});
