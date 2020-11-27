import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { API_ENDPOINT } from '../../../constants';
import { Observable, of, Subject } from 'rxjs';
import { Article } from '../../+article/article.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent implements OnInit, OnDestroy {
  recentArticles: { [pageIndex: number]: Article[] } = {};
  currentPage = 0;
  total = 0;
  pageSize = 0;
  complete$ = new Subject();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.queryRecentArticlesByPage(this.currentPage);
    this.queryRecentArticlesByPage(1);

    this.route.paramMap.pipe(takeUntil(this.complete$)).subscribe((paramMap) => {
      const pageNumber = parseInt(paramMap.get('page'), 10);
      if (isNaN(pageNumber) || pageNumber < 2) {
        this.router.navigate(['/articles']).then();
      } else {
        this.currentPage = pageNumber - 1;
        this.queryRecentArticles(pageNumber - 1);
      }
    });
  }

  getRecentArticles(
    pageIndex
  ): Observable<{
    total: number;
    pageSize: number;
    articles: Article[];
  }> {
    if (isPlatformServer(this.platformId)) {
      const staticDist = this.injector.get('STATIC_DIST');
      return of(JSON.parse(require('fs').readFileSync(`${staticDist}/recent-articles-${pageIndex}.json`, 'utf-8')));
    } else {
      return this.http.get<{
        total: number;
        pageSize: number;
        articles: Article[];
      }>(API_ENDPOINT + `/recent-articles-${pageIndex}.json`);
    }
  }

  private queryRecentArticlesByPage(pageIndex) {
    if (pageIndex < 0 || !!this.recentArticles[pageIndex]) {
      return;
    }
    this.getRecentArticles(pageIndex).subscribe((articles) => {
      this.recentArticles[pageIndex] = articles.articles;
      this.total = articles.total;
      this.pageSize = articles.pageSize;
    });
  }

  private queryRecentArticles(basePageIndex) {
    this.queryRecentArticlesByPage(basePageIndex);
    this.queryRecentArticlesByPage(basePageIndex + 1);
    this.queryRecentArticlesByPage(basePageIndex - 1);
  }

  public getArticleLink(articlePath: string): string {
    return articlePath.split('index.html')[0];
  }

  public onPageChange(pageIndex) {
    this.currentPage = pageIndex;
    this.router.navigate(['/articles', pageIndex + 1]).then();
  }

  ngOnDestroy(): void {
    this.complete$.next();
    this.complete$.complete();
  }
}
