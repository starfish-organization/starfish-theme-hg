import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { glitcher } from '../glitch.serve';

@Component({
  selector: 'fangwei',
  templateUrl: './fangwei.component.html',
  styleUrls: ['./fangwei.component.scss']
})
export class FangweiComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;

  constructor() {}

  ngOnInit() {
    const canvas = this.canvas.nativeElement;
    glitcher.init(canvas);
  }
}
