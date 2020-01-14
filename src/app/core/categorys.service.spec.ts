import { TestBed, inject } from '@angular/core/testing';

import { CategoriesService } from './categorys.service';
import { HttpClientModule } from '@angular/common/http';

describe('CategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CategoriesService], (service: CategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
