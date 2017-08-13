import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { API_ENDPOINT } from '../constants';

@Injectable()
export class CategorysService {
  constructor(private http: Http) {}

  getCategoryList(): Promise<any> {
    return this.http
      .get(API_ENDPOINT + '/categorys/index.json')
      .toPromise()
      .then(response => response.json());
  }
}
