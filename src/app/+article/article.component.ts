import { Component, OnInit, AfterViewChecked, AfterContentInit, ViewEncapsulation } from '@angular/core';
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
  article: Article;
  recentArticles = [];
  content: SafeHtml = '';
  contentInitialized = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
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
    return format(timestamp, 'yyyy年M月d号');
  }

  distanceTime(timestamp): string {
    const day: number = (new Date().getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24)
    if ( day / 365 >= 1 ) {
      return `写于 ${(day / 365).toFixed(0)} 年前`
    }
    if ( day / 30 >= 1 ) {
      return `写于 ${(day / 30).toFixed(0)} 个月前`
    }
    return `写于 ${day.toFixed(0) } 天前`
  }

  isLongAgo(timestamp): boolean {
    return new Date().getTime() - timestamp > 1000 * 60 * 60 * 24 * 265;
  }

  ngAfterViewChecked() {}

  ngAfterContentInit() {
    setTimeout(() => {
      this.contentInitialized = true;
    }, 300);
  }
}
