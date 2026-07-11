import { TestBed } from '@angular/core/testing';

import { FormDesignerFacade } from './form-designer.facade';
import { FormService } from '@domain/form/abstracts/form-service.abstract';

describe('FormDesignerFacade', () => {
  let service: FormDesignerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FormService, useValue: { getFormById: () => Promise.resolve() } }
      ]
    });
    service = TestBed.inject(FormDesignerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
