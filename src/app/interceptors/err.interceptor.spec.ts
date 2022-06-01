import { TestBed } from '@angular/core/testing';

import { ErrInterceptor } from './err.interceptor';

describe('ErrInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrInterceptor = TestBed.inject(ErrInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
