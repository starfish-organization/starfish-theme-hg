import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../categorys.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  host: {
    '[class]': 'currentRoute'
  }
})
export class NavComponent implements OnInit {
  categorysLink: string;
  currentRoute: string;

  constructor(private categorys: CategorysService, private route: Router) {}

  ngOnInit() {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          return (this.currentRoute = 'home');
        }
        if (event.url.indexOf('/categorys') > -1) {
          return (this.currentRoute = 'category');
        }
        return (this.currentRoute = 'articles');
      }
    });
  }
}
