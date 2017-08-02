import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanuageSwitchComponent } from './lanuage-switch.component';

describe('LanuageSwitchComponent', () => {
  let component: LanuageSwitchComponent;
  let fixture: ComponentFixture<LanuageSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanuageSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanuageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
