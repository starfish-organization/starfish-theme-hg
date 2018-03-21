import { Component, OnInit, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { format } from 'date-fns';
import { API_ENDPOINT } from '../../constants';
import { CategorysService } from '../core/categorys.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

class Article {
  name: string;
  articles: any[];
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategorysService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  category: {[key: string]: CategoryData} = {};
  categoryList: CategoryItem[] = [];


  get categorys() {
    return this.categoryList.map((categoryItem: CategoryItem) => {
      return this.category[categoryItem.categoryName];
    })
  }

  ngOnInit(): void {

    this.route.data
      .subscribe((data: {categoryListData: {categoryList: CategoryItem[]} }) => {
        console.log(data);
        const categoryList = data.categoryListData.categoryList;

        this.categoryList = categoryList;

        categoryList.forEach((categoryItem: CategoryItem) => {
          this.categoryService.getCategory(categoryItem.path).subscribe((categoryData: CategoryData) => {
            this.category[categoryItem.categoryName] = categoryData;
            console.log(categoryData);
          });
        });
      });
  }

  formatTime(timestamp: string | number): string {
    return format(timestamp, 'MMMM Do YYYY');
  }
}
