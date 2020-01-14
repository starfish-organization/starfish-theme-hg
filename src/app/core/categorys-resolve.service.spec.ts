import { TestBed, inject } from '@angular/core/testing';

import { CategorysResolver } from './categorys-resolve.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './categorys.service';

describe('CategorysResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorysResolver, CategoriesService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CategorysResolver], (service: CategorysResolver) => {
    expect(service).toBeTruthy();
  }));
});
