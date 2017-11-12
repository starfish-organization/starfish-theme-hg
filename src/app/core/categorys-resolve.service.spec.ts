import { TestBed, inject } from '@angular/core/testing';

import { CategorysResolveService } from './categorys-resolve.service';

describe('CategorysResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorysResolveService]
    });
  });

  it('should be created', inject([CategorysResolveService], (service: CategorysResolveService) => {
    expect(service).toBeTruthy();
  }));
});
