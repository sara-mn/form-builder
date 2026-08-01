import { TestBed } from '@angular/core/testing';

import { DynamicFormBuilderServic } from './dynamic-form-builder.servic';

describe('DynamicFormBuilderServic', () => {
    let service: DynamicFormBuilderServic;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DynamicFormBuilderServic);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
