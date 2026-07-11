import { TestBed } from '@angular/core/testing';

import { UserApiAdapter } from './user-api.adapter';

describe('UserApiAdapter', () => {
  let service: UserApiAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
