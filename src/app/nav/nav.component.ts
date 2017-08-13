import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../categorys.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  categorysLink: string;
  currentRoute: string;

  constructor(private categorys: CategorysService, private route: Router) {}
  ngOnInit() {
    this.categorys.getCategoryList().then(categoryList => {
      this.categorysLink = categoryList[0].relativeOutputPath;
    });

    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          return (this.currentRoute = 'home');
        }
        if (event.url) {
          if (event.url.match(/^\/(\w+)$/)) {
            return (this.currentRoute = 'blogs');
          }
        }
      }
    });
  }
}
