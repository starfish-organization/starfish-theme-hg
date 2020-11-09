import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { CategoriesService } from '../core/categorys.service';
import { PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryData } from './category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public allCategories: CategoryData[] = [];

  get categories(): CategoryData[] {
    return this.allCategories;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data: { allCategories: CategoryData[] }) => {
      this.allCategories = data.allCategories;
    });
  }

  public formatTime(timestamp): string {
    return format(timestamp, 'yyyy年M月d号');
  }

  // TODO extract
  public getArticleLink(articlePath: string): string {
    return '/' + articlePath.split('index.html')[0];
  }
}
