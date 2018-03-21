import { TestBed, inject } from '@angular/core/testing';

import { CategorysResolver } from './categorys-resolve.service';

describe('CategorysResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorysResolver]
    });
  });

  it('should be created', inject([CategorysResolver], (service: CategorysResolver) => {
    expect(service).toBeTruthy();
  }));
});
