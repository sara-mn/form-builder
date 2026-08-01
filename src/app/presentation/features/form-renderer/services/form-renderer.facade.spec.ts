import { TestBed } from '@angular/core/testing';

import { FormRendererFacade } from './form-renderer.facade';

describe('FormRendererFacade', () => {
    let service: FormRendererFacade;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FormRendererFacade);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
