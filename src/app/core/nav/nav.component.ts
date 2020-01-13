import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../categorys.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  host: {
    '[class]': 'currentRoute'
  }
})
export class NavComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}
}
