import { TestBed } from '@angular/core/testing';

import { PredefBooksService } from './predef-books.service';

describe('PredefBooksService', () => {
  let service: PredefBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
