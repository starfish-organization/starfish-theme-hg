import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { format } from 'date-fns';
import { CategoriesService } from '../core/categorys.service';
import { CategoryData } from './category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoriesService,
    private title: Title
  ) {}

  public allCategories: CategoryData[] = [];

  get categories(): CategoryData[] {
    return this.allCategories;
  }

  ngOnInit(): void {
    this.title.setTitle('放為的博客 归档');
    this.categoryService.getAllCategories().subscribe((data) => {
      this.allCategories = data;
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
