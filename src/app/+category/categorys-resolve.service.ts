import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CategoriesService } from '../core/categorys.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategorysResolver implements Resolve<any> {
  constructor(private http: HttpClient, private categoryService: CategoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.categoryService.getAllCategories();
  }
}
