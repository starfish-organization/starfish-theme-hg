import { Component, OnInit, Input } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input() articlePage;

  constructor() {}

  ngOnInit() {}

  public formatTime(timestamp): string {
    return format(timestamp, 'MMMM dd  YYYY, h:mm');
  }

  public getArticleLink(articlePath: string): string {
    return '/' + articlePath.split('index.html')[0];
  }
}
