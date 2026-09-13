import { TestBed } from '@angular/core/testing';

import { AccountFacade } from './account.facade';

describe('AccountFacade', () => {
    let service: AccountFacade;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AccountFacade);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
