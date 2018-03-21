import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { CategorysService } from './categorys.service';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CategorysResolver implements Resolve<any> {
  constructor(
    private http: Http,
    private router: Router,
    private categoryService: CategorysService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.categoryService.getCategoryList();
  }
}
