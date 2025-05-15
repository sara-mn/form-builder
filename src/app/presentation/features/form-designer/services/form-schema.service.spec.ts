import { TestBed } from '@angular/core/testing';

import { FormSchemaService } from './form-schema.service';

describe('FormSchemaService', () => {
  let service: FormSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
