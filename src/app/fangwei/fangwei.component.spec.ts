import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FangweiComponent } from './fangwei.component';

describe('FangweiComponent', () => {
  let component: FangweiComponent;
  let fixture: ComponentFixture<FangweiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FangweiComponent ]
    })
    .compileComponents();
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
