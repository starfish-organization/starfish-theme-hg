import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API_ENDPOINT } from '../constants';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class CategorysService {
  constructor(private http: Http,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  getCategoryList(): Promise<any> {
    if (isPlatformServer(this.platformId)) {
      return Promise.resolve(
        JSON.parse(
          require('fs').readFileSync(`build/categorys/index.json`, 'utf-8')
        )
      );
    } else {
      return this.http
        .get(API_ENDPOINT + '/categorys/index.json')
        .toPromise()
        .then(response => response.json());
    }
  }
}
