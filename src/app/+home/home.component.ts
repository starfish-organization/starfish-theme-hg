import { Component, OnInit } from '@angular/core';
import { FangweiComponent } from '../fangwei/fangwei.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('hi2');
    this.error();
  }

  error() {
    //throw new Error('hi3');
  }
}
