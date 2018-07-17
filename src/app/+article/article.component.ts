import {
  Component,
  OnInit,
  AfterViewChecked,
  AfterContentInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { Article } from './article';
import { format, formatDistance } from 'date-fns';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit, AfterViewChecked, AfterContentInit {
  article: Article = {};
  recentArticles = [];
  content: SafeHtml = '';
  contentInited = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // TODO remove base because anchor link
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
      this.content = this.sanitizer.bypassSecurityTrustHtml(data.article.content);
      this.titleService.setTitle(`${data.article.title}`);
    });
  }

  formatTime(timestamp): string {
    return format(timestamp, 'MMMM dd YYYY, h:mm');
  }

  distanceTime(timestamp): string {
    return formatDistance(new Date(timestamp), new Date());
  }

  isLongAgo(timestamp): boolean {
    return new Date().getTime() - timestamp > 1000 * 60 * 60 * 24 * 265;
  }

  ngAfterViewChecked() {}

  ngAfterContentInit() {
    setTimeout(() => {
      this.contentInited = true;
    }, 300);
  }
}
