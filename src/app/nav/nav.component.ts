import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../categorys.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  categorysLink: string;

  constructor(private categorys: CategorysService) {}

  ngOnInit() {
    this.categorys.getCategoryList().then(categoryList => {
      this.categorysLink = categoryList[0].relativeOutputPath;
    });
  }
}
