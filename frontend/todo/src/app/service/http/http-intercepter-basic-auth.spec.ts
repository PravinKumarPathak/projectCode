import { TestBed } from '@angular/core/testing';

import { HttpIntercepterBasicAuth } from './http-intercepter-basic-auth';

describe('HttpIntercepterBasicAuth', () => {
  let service: HttpIntercepterBasicAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIntercepterBasicAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
