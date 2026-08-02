import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockBanner } from './lock-banner';

describe('LockBanner', () => {
    let component: LockBanner;
    let fixture: ComponentFixture<LockBanner>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LockBanner]
        }).compileComponents();

        fixture = TestBed.createComponent(LockBanner);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
