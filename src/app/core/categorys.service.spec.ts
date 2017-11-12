import { TestBed, inject } from '@angular/core/testing';

import { CategorysService } from './categorys.service';

describe('CategorysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorysService]
    });
  });

  it('should be created', inject([CategorysService], (service: CategorysService) => {
    expect(service).toBeTruthy();
  }));
});
