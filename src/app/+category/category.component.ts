import 'rxjs/add/operator/switchMap';
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
    private categorys: CategorysService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  category: any = {};
  categoryList: Array<any> = [];

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        if (isPlatformServer(this.platformId)) {
          return Promise.resolve(
            JSON.parse(
              require('fs').readFileSync(`build/${params['categoryName']}/index.json`, 'utf-8')
            )
          );
        }
        return this.http
          .get(API_ENDPOINT + `/${params['categoryName']}/index.json`)
          .toPromise()
          .then(response => response.json());
      })
      .subscribe(res => (this.category = res));

    this.categorys.getCategoryList().then(categroyList => {
      this.categoryList = categroyList;
    });
  }

  formatTime(timestamp: string | number): string {
    return format(timestamp, 'MMMM Do YYYY, h:mm');
  }
}
