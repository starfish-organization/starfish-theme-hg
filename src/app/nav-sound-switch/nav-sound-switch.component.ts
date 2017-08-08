import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nav-sound-switch',
  templateUrl: './nav-sound-switch.component.html',
  styleUrls: ['./nav-sound-switch.component.scss']
})
export class NavSoundSwitchComponent implements OnInit {
  @ViewChild('audio') audio: ElementRef;
  isPlaying: boolean = true;
  constructor() {}

  ngOnInit() {}

  onClick() {
    const audio = this.audio.nativeElement;
    this.isPlaying = !this.isPlaying;
    if (!this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }
}
