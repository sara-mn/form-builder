import { TestBed } from '@angular/core/testing';

import { FormDesignerFacadeService } from './form-designer-facade.service';
import { FormService } from '@domain/form/abstracts/form-service.abstract';

describe('FormDesignerFacadeService', () => {
  let service: FormDesignerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FormService, useValue: { getFormById: () => Promise.resolve() } }
      ]
    });
    service = TestBed.inject(FormDesignerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
