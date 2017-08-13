import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { '[class]': 'currentRoute' }
})
export class AppComponent implements OnInit {
  currentRoute: string;

  constructor(private route: Router) {}
  ngOnInit() {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          return (this.currentRoute = 'home');
        }
        if (event.url.match(/^\/(\w+)$/)) {
          return (this.currentRoute = 'blogs');
        }
        if (event.url.match(/\//g).length === 2) {
          return (this.currentRoute = 'article');
        }
      }
    });
  }
}
