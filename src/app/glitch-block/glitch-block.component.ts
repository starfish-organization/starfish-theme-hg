import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import Glitcher from '../glitch.serve';

@Component({
  selector: 'glitch-block',
  templateUrl: './glitch-block.component.html',
  styleUrls: ['./glitch-block.component.scss']
})
export class GlitchBlockComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() text: string;
  @Input() size: string;
  glitcher: any;

  constructor() {}

  ngOnInit() {
    const canvas = this.canvas.nativeElement;
    this.glitcher = new Glitcher(canvas, this.text, this.size);
    this.glitcher.start();
  }

  ngOnDestroy() {}
}
