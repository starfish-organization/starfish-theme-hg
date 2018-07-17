import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowLinkComponent } from './shadow-link.component';

describe('ShadowLinkComponent', () => {
  let component: ShadowLinkComponent;
  let fixture: ComponentFixture<ShadowLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShadowLinkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
