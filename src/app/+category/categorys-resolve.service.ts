import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CategoriesService } from '../core/categorys.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryData } from './category.interface';

@Injectable()
export class CategoryResolver implements Resolve<CategoryData[]> {
  constructor(private http: HttpClient, private categoryService: CategoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CategoryData[]> {
    return this.categoryService.getAllCategories();
  }
}
