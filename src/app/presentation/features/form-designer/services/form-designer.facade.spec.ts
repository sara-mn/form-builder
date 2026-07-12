import { TestBed } from '@angular/core/testing';

import { FormDesignerFacade } from './form-designer.facade';
import { FormRepository } from '@domain/form/abstracts/form.repository.abstract';

describe('FormDesignerFacade', () => {
  let service: FormDesignerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FormRepository, useValue: { getFormById: () => Promise.resolve() } }
      ]
    });
    service = TestBed.inject(FormDesignerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
