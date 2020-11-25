import { Inject, ViewChild, AfterViewInit, ElementRef, Component, OnInit, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var hljs: any;

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss'],
})
export class ArticleContentComponent implements OnInit, AfterViewInit {
  @Input()
  content: string;
  @ViewChild('articleDom')
  articleDom: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  private highlightify(): void {
    this.articleDom.nativeElement.querySelectorAll('pre code').forEach((e) => hljs.highlightBlock(e));
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.highlightify();
    }
  }
}
