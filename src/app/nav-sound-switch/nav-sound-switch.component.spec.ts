import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSoundSwitchComponent } from './nav-sound-switch.component';

describe('NavSoundSwitchComponent', () => {
  let component: NavSoundSwitchComponent;
  let fixture: ComponentFixture<NavSoundSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavSoundSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSoundSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
