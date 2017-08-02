import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLinkComponent } from './footer-link.component';

describe('FooterLinkComponent', () => {
  let component: FooterLinkComponent;
  let fixture: ComponentFixture<FooterLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
