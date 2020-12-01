import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { advanceBy, advanceTo, clear } from 'jest-date-mock';

import { ArticleComponent } from './article.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: new Subject(),
            snapshot: {
              paramMap: {
                get: () => ''
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            paramMap: of()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should distanceTime correctly', () => {
    advanceTo(new Date(2020, 1, 1, 0, 0, 0));

    expect(component.distanceTime(new Date(2019, 12, 27, 0, 0, 0))).toEqual('写于 5 天前');
    expect(component.distanceTime(new Date(2019, 7, 27, 0, 0, 0))).toEqual('写于 5 个月前');
    expect(component.distanceTime(new Date(2017, 12, 27, 0, 0, 0))).toEqual('写于 2 年前');

    clear();
  });
});
