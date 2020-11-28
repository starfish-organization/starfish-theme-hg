import { of as observableOf, Observable } from 'rxjs';
import { Inject, Injectable, Injector } from '@angular/core';
import { API_ENDPOINT } from '../../constants';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CategoryData } from '../+archive/category.interface';

@Injectable()
export class CategoriesService {
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,   private injector: Injector) {}

  getAllCategories(): Observable<CategoryData[]> {
    if (isPlatformServer(this.platformId)) {
      const staticDist = this.injector.get('STATIC_DIST');
      return observableOf(JSON.parse(require('fs').readFileSync(`${staticDist}/all-category.json`, 'utf-8')));
    } else {
      return this.httpClient.get<CategoryData[]>(API_ENDPOINT + '/all-category.json');
    }
  }
}
