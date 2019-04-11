import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shadow-link',
  templateUrl: './shadow-link.component.html',
  styleUrls: ['./shadow-link.component.scss']
})
export class ShadowLinkComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  href: string;

  constructor() {}

  ngOnInit() {}
}
