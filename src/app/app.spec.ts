import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { PrimeNG } from 'primeng/config';

describe('App', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [App],
            providers: [provideRouter([])]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should set the title', () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app.title).toBe('form-builder');
    });

    it('should render a router-outlet', () => {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const outlet = fixture.nativeElement.querySelector('router-outlet');
        expect(outlet).toBeTruthy();
    });

    it('should enable ripple on init', () => {
        const fixture = TestBed.createComponent(App);
        const primeng = TestBed.inject(PrimeNG);
        const rippleSpy = vi.spyOn(primeng.ripple, 'set');

        fixture.detectChanges();

        expect(rippleSpy).toHaveBeenCalledWith(true);
    });
});
