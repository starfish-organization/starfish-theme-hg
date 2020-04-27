import { TestBed, inject } from '@angular/core/testing';

import { CategoryResolver } from './categorys-resolve.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '../core/categorys.service';

describe('CategorysResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryResolver, CategoriesService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CategoryResolver], (service: CategoryResolver) => {
    expect(service).toBeTruthy();
  }));
});
