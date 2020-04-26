import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import Glitcher from '../glitch.serve';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-glitch-block',
  templateUrl: './glitch-block.component.html',
  styleUrls: ['./glitch-block.component.scss']
})
export class GlitchBlockComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: false })
  canvas: ElementRef;

  @Input()
  text: string;

  @Input()
  size: string;

  @Input()
  silent: boolean;
  glitcher: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvas.nativeElement;
      this.glitcher = new Glitcher(canvas, this.text, this.size, this.silent);
      this.glitcher.start();

      canvas.addEventListener('mouseover', event => {
        this.glitcher.start();
      });
    }
  }

  ngOnDestroy() {}
}
