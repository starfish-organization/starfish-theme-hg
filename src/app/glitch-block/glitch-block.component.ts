import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import Glitcher from '../glitch.serve';

@Component({
  selector: 'glitch-block',
  templateUrl: './glitch-block.component.html',
  styleUrls: ['./glitch-block.component.scss']
})
export class GlitchBlockComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() url: string;
  glitcher: any;

  constructor() {
    this.glitcher = new Glitcher();
  }

  ngOnInit() {
    const canvas = this.canvas.nativeElement;
    this.glitcher.init(canvas);
    // const canvas = this.canvas.nativeElement;
    // glitcher.init(canvas);
  }

  ngOnDestroy() {}
}
