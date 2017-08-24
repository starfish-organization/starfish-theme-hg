import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { API_ENDPOINT } from '../../constants';
import { Article } from './article';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private http: Http, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Article> {
    const articleName = route.paramMap.get('articleName').replace('.html', '');
    const categoryName = route.paramMap.get('categoryName');
    return this.http
      .get(API_ENDPOINT + `/${categoryName}/${articleName}/index.json`)
      .toPromise()
      .then(article => {
        return article.json();
      });
  }
}
