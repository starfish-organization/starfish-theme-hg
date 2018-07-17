import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Headers } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { CategorysService } from './categorys.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategorysResolver implements Resolve<any> {
  constructor(
    private http: HttpClient,
    private router: Router,
    private categoryService: CategorysService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.categoryService.getCategoryList();
  }
}
