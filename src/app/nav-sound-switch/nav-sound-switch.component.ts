import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-sound-switch',
  templateUrl: './nav-sound-switch.component.html',
  styleUrls: ['./nav-sound-switch.component.scss']
})
export class NavSoundSwitchComponent implements OnInit {
  isPlaying: boolean = false;
  constructor() {}

  ngOnInit() {}

  onClick() {
    this.isPlaying = !this.isPlaying;
  }
}
