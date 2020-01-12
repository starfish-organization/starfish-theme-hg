import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowLinkComponent } from './shadow-link.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ShadowLinkComponent', () => {
  let component: ShadowLinkComponent;
  let fixture: ComponentFixture<ShadowLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShadowLinkComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
