import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchBlockComponent } from './glitch-block.component';

describe('GlitchBlockComponent', () => {
  let component: GlitchBlockComponent;
  let fixture: ComponentFixture<GlitchBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlitchBlockComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlitchBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
