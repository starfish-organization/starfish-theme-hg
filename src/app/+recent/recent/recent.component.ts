import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { API_ENDPOINT } from '../../../constants';
import { Observable, of } from 'rxjs';
import { Article } from '../../+article/article.interface';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {
  recentArticles: {[pageIndex: number]: Article[]} = {};
  currentPage = 0;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector
  ) {}

  ngOnInit() {
    const pageIndex = this.currentPage;
    this.getRecentArticles(pageIndex).subscribe(articles => {
      this.recentArticles[pageIndex] = articles;
    });
  }

  getRecentArticles(pageIndex): Observable<Article[]> {
    if (isPlatformServer(this.platformId)) {
      const staticDist = this.injector.get('STATIC_DIST');
      return of(JSON.parse(require('fs').readFileSync(`${staticDist}/recent-articles-${pageIndex}.json`, 'utf-8')));
    } else {
      return this.http.get<Article[]>(API_ENDPOINT + `/recent-articles.json`);
    }
  }

  public getArticleLink(articlePath: string): string {
    return '/' + articlePath.split('index.html')[0];
  }

  public onPageSelect(pageIndex) {
    this.currentPage = pageIndex;
  }
}
