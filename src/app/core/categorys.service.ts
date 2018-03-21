import { Inject, Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { API_ENDPOINT } from '../../constants';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategorysService {
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getCategoryList(): Observable<any> {
    if (isPlatformServer(this.platformId)) {
      return Observable.of(
        JSON.parse(require('fs').readFileSync(`build/categorys/index.json`, 'utf-8'))
      );
    } else {
      return this.httpClient
        .get(API_ENDPOINT + '/categorys/index.json')
    }
  }

  getCategory(categoryPath): Observable<object> {
    return this.httpClient.get(API_ENDPOINT + categoryPath + '/index.json');
  }
}
