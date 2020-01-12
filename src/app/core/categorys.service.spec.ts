import { TestBed, inject } from '@angular/core/testing';

import { CategorysService } from './categorys.service';
import { HttpClientModule } from '@angular/common/http';

describe('CategorysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorysService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CategorysService], (service: CategorysService) => {
    expect(service).toBeTruthy();
  }));
});
