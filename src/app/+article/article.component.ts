import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { API_ENDPOINT } from '../../constants';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';

class Article {
  title: string;
  content: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  article: any = {};
  content: SafeHtml;

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        var articleFilename = params['articleName'].replace('.html', '');
        return this.http
          .get(API_ENDPOINT + `/${params['categoryName']}/${articleFilename}.json`)
          .toPromise()
          .then(response => response.json());
      })
      .subscribe(res => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(res.content);
        this.article = res;
      });
  }
}
