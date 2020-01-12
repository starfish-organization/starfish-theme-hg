import { TestBed, inject } from '@angular/core/testing';

import { CategorysResolver } from './categorys-resolve.service';
import { HttpClientModule } from '@angular/common/http';
import { CategorysService } from './categorys.service';

describe('CategorysResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorysResolver, CategorysService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CategorysResolver], (service: CategorysResolver) => {
    expect(service).toBeTruthy();
  }));
});
