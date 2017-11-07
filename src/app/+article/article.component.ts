import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {
  Inject,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { API_ENDPOINT } from '../../constants';
import { DomSanitizer, SafeResourceUrl, SafeHtml, Title } from '@angular/platform-browser';
import { Article } from './article';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { parse, format, formatDistance } from 'date-fns';

declare var hljs: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit, AfterViewInit {
  @ViewChild('articleDom') articleDom: ElementRef;
  article: Article = {};
  recentArticles = [];
  content: SafeHtml = '';

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // TODO remove base because anchor link
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
      this.content = this.sanitizer.bypassSecurityTrustHtml(data.article.content);
      this.titleService.setTitle(`${data.article.title}`);
    });
  }


  formatTime(timestamp) {
    return format(timestamp, 'MMMM Do YYYY, h:mm');
  }

  distanceTime(timestamp) {
    return formatDistance(new Date(timestamp), new Date());
  }

  isLongAgo(timestamp) {
    return new Date().getTime() - timestamp > 1000 * 60 * 60 * 24 * 265;
  }

  highlightify() {
    this.articleDom.nativeElement.querySelectorAll('pre code').forEach(e => hljs.highlightBlock(e));
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.highlightify();
    }
  }
}
