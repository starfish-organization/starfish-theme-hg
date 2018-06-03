import { Component, OnInit, Input } from '@angular/core';
import { parse, format, formatDistance } from 'date-fns';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input() articlePage

  constructor() {}

  formatTime(timestamp): string {
    return format(timestamp, 'MMMM Do YYYY, h:mm');
  }


  ngOnInit() {}
}
