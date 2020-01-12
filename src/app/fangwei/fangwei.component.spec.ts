import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FangweiComponent } from './fangwei.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FangweiComponent', () => {
  let component: FangweiComponent;
  let fixture: ComponentFixture<FangweiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FangweiComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FangweiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
