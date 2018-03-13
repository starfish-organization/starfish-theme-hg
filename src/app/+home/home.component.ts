import { Component, OnInit } from '@angular/core';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { CategorysService } from '../core/categorys.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
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
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private categorys: CategorysService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.titleService.setTitle(`奔為狼--放為的博客 首页`);

    this.route.data.subscribe((data: { categoryList: any }) => {
      this.blogsLink = data.categoryList[0].relativeOutputPath;
    });

    this.httpClient.get(API_ENDPOINT + `/recent-articles.json`).subscribe((response: any[]) => {
      this.recentArticles = response;
    });
  }
}
