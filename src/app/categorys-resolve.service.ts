import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { API_ENDPOINT } from '../constants';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { CategorysService } from './categorys.service';

@Injectable()
export class CategorysResolveService implements Resolve<any> {
  constructor(
    private http: Http,
    private router: Router,
    private categoryService: CategorysService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.categoryService.getCategoryList();
  }
}
