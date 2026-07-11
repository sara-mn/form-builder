import { TestBed } from '@angular/core/testing';

import { AuthApiAdapter } from './auth-api.adapter';

describe('AuthApiAdapter', () => {
  let service: AuthApiAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
