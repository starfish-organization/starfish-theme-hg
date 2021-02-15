import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class')
  currentRouteClass: string;

  constructor(private route: Router) {}

  ngOnInit() {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        if (event.url === '/') {
          return (this.currentRouteClass = 'home');
        }
        if (event.url.match(/^\/(\w+)$/)) {
          return (this.currentRouteClass = 'blogs');
        }
        if (event.url.match(/\//g).length === 2) {
          return (this.currentRouteClass = 'article');
        }
      }
    });
  }
}
