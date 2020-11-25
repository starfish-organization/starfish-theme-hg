import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRencentArticlesComponent } from './home-rencent-articles.component';

describe('HomeRencentArticlesComponent', () => {
  let component: HomeRencentArticlesComponent;
  let fixture: ComponentFixture<HomeRencentArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRencentArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRencentArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
