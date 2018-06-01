
import {of as observableOf,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { API_ENDPOINT } from '../../constants';

@Component({
  selector: 'app-recent-articles',
  templateUrl: './recent-articles.component.html',
  styleUrls: ['./recent-articles.component.scss']
})
export class RecentArticlesComponent implements OnInit {
  recentArticles = [];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.getRecentArticles().subscribe(articles => {
      this.recentArticles = articles;
    });
  }

  getRecentArticles(): Observable<any> {
    if (isPlatformServer(this.platformId)) {
      return observableOf(
        JSON.parse(require('fs').readFileSync(`build/recent-articles.json`, 'utf-8'))
      );
    } else {
      return this.http
        .get(API_ENDPOINT + `/recent-articles.json`)
    }
  }

  public getArticleLink(articlePath: string): string {
    return '/' + articlePath.split('index.html')[0];
  }

}
