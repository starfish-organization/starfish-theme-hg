import { Component, OnInit, ViewEncapsulation, Injector, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { Article } from './article.interface';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_ENDPOINT } from '../../constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  article: Article;
  recentArticles = [];
  content: SafeHtml = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // TODO remove base because anchor link
    this.getArticle().subscribe((article: Article) => {
      this.article = article;
      this.content = this.sanitizer.bypassSecurityTrustHtml(article.content);
      this.titleService.setTitle(`${article.title}`);
    });
  }

  getArticle(): Observable<Article> {
    const articleName = this.route.snapshot.paramMap.get('articleName').replace('.html', '');
    const categoryName = this.route.snapshot.paramMap.get('categoryName');
    if (isPlatformServer(this.platformId)) {
      const staticDist = this.injector.get('STATIC_DIST'); // TODO: InjectionToken
      return of(
        JSON.parse(require('fs').readFileSync(`${staticDist}/${categoryName}/${articleName}/index.json`, 'utf-8'))
      );
    } else {
      return this.http.get<Article>(API_ENDPOINT + `/${categoryName}/${articleName}/index.json`);
    }
  }

  formatTime(timestamp): string {
    if (!timestamp) {
      return '';
    }
    return format(timestamp, 'yyyy年M月d号');
  }

  distanceTime(timestamp): string {
    const day: number = (new Date().getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24);
    if (day / 365 >= 1) {
      return `写于 ${(day / 365).toFixed(0)} 年前`;
    }
    if (day / 30 >= 1) {
      return `写于 ${(day / 30).toFixed(0)} 个月前`;
    }
    return `写于 ${day.toFixed(0)} 天前`;
  }
}
