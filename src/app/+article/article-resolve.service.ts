import { Inject, Injectable, Injector } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { API_ENDPOINT } from '../../constants';
import { Article } from './article.interface';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private http: HttpClient,
    private router: Router,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Article> {
    const articleName = route.paramMap.get('articleName').replace('.html', '');
    const categoryName = route.paramMap.get('categoryName');
    if (isPlatformServer(this.platformId)) {
      const staticDist = this.injector.get('STATIC_DIST');
      return Promise.resolve(
        JSON.parse(require('fs').readFileSync(`${staticDist}/${categoryName}/${articleName}/index.json`, 'utf-8'))
      );
    } else {
      return this.http
        .get(API_ENDPOINT + `/${categoryName}/${articleName}/index.json`)
        .toPromise()
        .then((article: Article) => {
          return article;
        });
    }
  }
}
