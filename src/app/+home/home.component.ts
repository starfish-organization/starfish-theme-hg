import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogsLink: string;
  public recentArticles: any[];
  public articlePage;

  constructor(
    private titleService: Title,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.titleService.setTitle(`陈放為的博客 首页`);
    this.getArticles();
  }

  public getArticles() {
    this.httpClient.get(API_ENDPOINT + '/articles/articles-0.json').subscribe(data => {
      this.articlePage = data;
    });
  }
}
