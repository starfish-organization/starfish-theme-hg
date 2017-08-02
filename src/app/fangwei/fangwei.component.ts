import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'fangwei',
  templateUrl: './fangwei.component.html',
  styleUrls: ['./fangwei.component.scss']
})
export class FangweiComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;

  constructor() {}

  ngOnInit() {
    /* const canvas = this.canvas.nativeElement;
     * glitcher.init(canvas);*/
  }

  ngOnDestroy() {}
}
