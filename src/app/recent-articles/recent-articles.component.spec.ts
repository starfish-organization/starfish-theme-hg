import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentArticlesComponent } from './recent-articles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('RecentArticlesComponent', () => {
  let component: RecentArticlesComponent;
  let fixture: ComponentFixture<RecentArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentArticlesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
