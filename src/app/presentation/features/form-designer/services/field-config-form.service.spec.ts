import { TestBed } from '@angular/core/testing';

import { FieldConfigFormService } from './field-config-form.service';

describe('FieldConfigFormService', () => {
  let service: FieldConfigFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldConfigFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
