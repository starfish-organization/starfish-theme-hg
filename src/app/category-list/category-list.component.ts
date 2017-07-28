import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { API_ENDPOINT } from '../../constants';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  constructor(private http: Http) {}

  categorys = [];

  ngOnInit(): void {
    this.http.get(API_ENDPOINT + '/categorys/index.json').toPromise().then(response => {
      this.categorys = response.json();
    });
  }
}
