import { TestBed } from '@angular/core/testing';

import { FormListFacade } from './form-list.facade';

describe('FormListFacade', () => {
    let service: FormListFacade;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FormListFacade);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
