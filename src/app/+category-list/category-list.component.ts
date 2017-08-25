import 'rxjs/add/operator/switchMap';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { API_ENDPOINT } from '../../constants';
import { CategorysService } from '../categorys.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryList = [];

  constructor(private categorys: CategorysService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('放為 Categorys');
    this.categorys.getCategoryList().then(categoryList => {
      this.categoryList = categoryList;
    });
  }
}
