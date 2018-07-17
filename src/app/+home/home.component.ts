import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../core/categorys.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private titleService: Title,
    private categorys: CategorysService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.titleService.setTitle(`奔為狼--放為的博客 首页`);
    this.getArticles();
  }

  public getArticles() {
    this.httpClient.get(API_ENDPOINT + '/articles/articles-0.json').subscribe(data => {
      this.articlePage = data;
    });
  }
}
