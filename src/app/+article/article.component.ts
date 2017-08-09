import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { API_ENDPOINT } from '../../constants';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

class Article {
  title?: string;
  content?: string;
  showTime?: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {
  @ViewChild('articleDom') articleDom: ElementRef;
  article: Article = {};
  content: SafeHtml;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // TODO remove base because anchor link
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
        this.titleService.setTitle(`${this.article.title}`);
      });
  }
}
