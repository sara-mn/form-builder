import { TestBed } from '@angular/core/testing';

import { FormDesignerFacadeService } from './form-designer-facade.service';

describe('FormDesignerFacadeService', () => {
  let service: FormDesignerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDesignerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
