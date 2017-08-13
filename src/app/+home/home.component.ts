import { Component, OnInit } from '@angular/core';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { CategorysService } from '../categorys.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private titleService: Title, private categorys: CategorysService) {}

  ngOnInit() {
    this.titleService.setTitle(`陳放為的博客 首页`);
  }
}
