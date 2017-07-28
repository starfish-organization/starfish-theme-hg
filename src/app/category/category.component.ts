import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import { API_ENDPOINT } from '../../constants';

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
  constructor(private http: Http, private route: ActivatedRoute, private location: Location) {}

  category: any = {};

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) =>
        this.http
          .get(API_ENDPOINT + `/${params['categoryName']}/index.json`)
          .toPromise()
          .then(response => response.json())
      )
      .subscribe(res => (this.category = res));
  }
}
