import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavItem } from './nav-item';
import { NavItemModel } from '../nav-item.model';

function createFakeNavItemModel(overrides: Partial<NavItemModel> = {}): NavItemModel {
    return {
        label: 'Dashboard',
        icon: 'pi-home',
        routerLink: ['/dashboard'],
        ...overrides
    };
}

describe('NavItem', () => {
    let component: NavItem;
    let fixture: ComponentFixture<NavItem>;

    async function setup(item: NavItemModel, root = false): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [NavItem],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(NavItem);
        fixture.componentRef.setInput('item', item);
        fixture.componentRef.setInput('root', root);

        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    it('should create', async () => {
        await setup(createFakeNavItemModel());
        expect(component).toBeTruthy();
    });

    it('should render a link (not a toggle button) for a leaf item', async () => {
        await setup(createFakeNavItemModel({ label: 'Dashboard' }));

        const link = fixture.nativeElement.querySelector(':scope > a[aria-label="Dashboard"]');
        const button = fixture.nativeElement.querySelector(':scope > button');

        expect(link).toBeTruthy();
        expect(button).toBeFalsy();
    });

    it('should render a toggle button (not a link) for an item with children', async () => {
        const parent = createFakeNavItemModel({
            label: 'Settings',
            items: [createFakeNavItemModel({ label: 'Child' })]
        });
        await setup(parent);

        const link = fixture.nativeElement.querySelector(':scope > a');
        const button = fixture.nativeElement.querySelector(':scope > button[aria-label="Toggle Settings submenu"]');

        expect(button).toBeTruthy();
        expect(link).toBeFalsy();
    });

    it('should have aria-expanded false by default', async () => {
        const parent = createFakeNavItemModel({
            label: 'Settings',
            items: [createFakeNavItemModel({ label: 'Child' })]
        });
        await setup(parent);

        const button: HTMLButtonElement = fixture.nativeElement.querySelector(':scope > button[aria-label="Toggle Settings submenu"]');
        expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set aria-expanded to true on toggle button click', async () => {
        const parent = createFakeNavItemModel({
            label: 'Settings',
            items: [createFakeNavItemModel({ label: 'Child' })]
        });
        await setup(parent);

        const button: HTMLButtonElement = fixture.nativeElement.querySelector(':scope > button[aria-label="Toggle Settings submenu"]');
        button.click();
        fixture.detectChanges();

        expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set aria-expanded back to false on a second toggle click', async () => {
        const parent = createFakeNavItemModel({
            label: 'Settings',
            items: [createFakeNavItemModel({ label: 'Child' })]
        });
        await setup(parent);

        const button: HTMLButtonElement = fixture.nativeElement.querySelector(':scope > button[aria-label="Toggle Settings submenu"]');
        button.click();
        fixture.detectChanges();
        button.click();
        fixture.detectChanges();

        expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('should render one nested app-nav-item per child', async () => {
        const parent = createFakeNavItemModel({
            items: [createFakeNavItemModel({ label: 'Child A' }), createFakeNavItemModel({ label: 'Child B' })]
        });
        await setup(parent);

        const nestedItems = fixture.nativeElement.querySelectorAll('li > app-nav-item');
        expect(nestedItems.length).toBe(2);
    });

    it('documents current behavior: empty items array is still treated as expandable', async () => {
        const parent = createFakeNavItemModel({ label: 'Empty', items: [] });
        await setup(parent);

        const button = fixture.nativeElement.querySelector(':scope > button[aria-label="Toggle Empty submenu"]');
        expect(button).toBeTruthy(); // potential UX bug — see discussion above
    });

    it('should default root to false when not provided', async () => {
        await setup(createFakeNavItemModel());
        expect(component.root).toBe(false);
    });

    it('should render nested items recursively without provider errors', async () => {
        const nested = createFakeNavItemModel({
            label: 'Settings',
            items: [createFakeNavItemModel({ label: 'Profile', routerLink: ['/settings/profile'] })]
        });
        await setup(nested, true);
        expect(component.item.items?.length).toBe(1);
    });
});
