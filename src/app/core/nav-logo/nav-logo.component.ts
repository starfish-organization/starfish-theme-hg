import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-nav-logo',
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss']
})
export class NavLogoComponent implements OnInit, AfterContentInit {
  contentInited = false;
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.contentInited = true;
    }, 300);
  }
}
