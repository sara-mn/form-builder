import { TestBed } from '@angular/core/testing';

import { FormDesignerFacade } from './form-designer.facade';

describe('FormDesignerFacade', () => {
    let service: FormDesignerFacade;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FormDesignerFacade);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
