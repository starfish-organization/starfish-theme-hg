import { Component, OnInit } from '@angular/core';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { CategorysService } from '../core/categorys.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogsLink: string;
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private categorys: CategorysService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { categoryList: any }) => {
      this.blogsLink = data.categoryList[0].relativeOutputPath;
    });
    this.titleService.setTitle(`陳放為的博客 首页`);
  }
}
