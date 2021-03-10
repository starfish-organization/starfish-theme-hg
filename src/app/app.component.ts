import { Component, OnInit, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class')
  currentRouteClass: string;

  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!isPlatformServer(this.platformId)) {
          window && window.scrollTo(0, 0); 
       }
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
