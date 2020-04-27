import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  host: {
    '[class]': 'currentRoute'
  }
})
export class NavComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef<HTMLInputElement>;

  constructor(private route: Router) {}

  ngOnInit() {}

  onSearch() {
    const inputValue = this.searchInput.nativeElement.value;
    if (!inputValue) {
      return;
    }
    const url = 'https://www.google.com/search?q=site:chencanhao.com ' + inputValue;
    window.open(url, '_blank');
  }
}
