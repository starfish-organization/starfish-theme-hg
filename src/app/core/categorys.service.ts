import { of as observableOf, Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../constants';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategorysService {
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getCategoryList(): Observable<any> {
    if (isPlatformServer(this.platformId)) {
      return observableOf(
        JSON.parse(require('fs').readFileSync(`build/categorys/index.json`, 'utf-8'))
      );
    } else {
      return this.httpClient.get(API_ENDPOINT + '/categorys/index.json');
    }
  }

  getCategory(categoryPath): Observable<object> {
    if (isPlatformServer(this.platformId)) {
      return observableOf(
        JSON.parse(require('fs').readFileSync(`build${categoryPath}/index.json`, 'utf-8'))
      );
    } else {
      return this.httpClient.get(API_ENDPOINT + categoryPath + '/index.json');
    }
  }
}
