import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LockBanner } from './lock-banner';

describe('LockBanner', () => {
    let fixture: ComponentFixture<LockBanner>;
    let component: LockBanner;

    function setup(cloning = false) {
        TestBed.configureTestingModule({
            imports: [LockBanner]
        });
        fixture = TestBed.createComponent(LockBanner);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('cloning', cloning);
        fixture.detectChanges();
    }

    it('should create', () => {
        setup();
        expect(component).toBeTruthy();
    });

    it('should show "Clone to Edit" when not cloning', () => {
        setup(false);
        const button = fixture.nativeElement.querySelector('button');
        expect(button.textContent.trim()).toBe('Clone to Edit');
    });

    it('should show "Cloning..." and disable the button while cloning', () => {
        setup(true);
        const button = fixture.nativeElement.querySelector('button');
        expect(button.textContent.trim()).toBe('Cloning...');
        expect(button.disabled).toBe(true);
    });

    it('should emit cloneRequested when the button is clicked', () => {
        setup(false);
        const emitSpy = vi.fn();
        component.cloneRequested.subscribe(emitSpy);

        const button = fixture.nativeElement.querySelector('button');
        button.click();

        expect(emitSpy).toHaveBeenCalled();
    });
});
