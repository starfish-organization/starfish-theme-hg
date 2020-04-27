import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../categorys.service';
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
  @ViewChild('searchInput', { static: true }) searchInput: HTMLInputElement;

  constructor(private route: Router) {}

  ngOnInit() {}

  onSearch() {
    window.location.href = 'https://www.google.com/search?q=site:chencanhao.com%20nihao';
  }
}
