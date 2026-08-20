import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadySubmittedBanner } from './already-submitted-banner';

describe('AlreadySubmittedBanner', () => {
    let component: AlreadySubmittedBanner;
    let fixture: ComponentFixture<AlreadySubmittedBanner>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlreadySubmittedBanner]
        }).compileComponents();

        fixture = TestBed.createComponent(AlreadySubmittedBanner);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
