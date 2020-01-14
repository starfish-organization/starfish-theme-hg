import { take } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { CategoriesService } from '../core/categorys.service';
import { PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  public category: { [key: string]: CategoryData } = {};
  public categoryList: CategoryItem[] = [];

  get categories() {
    return this.categoryList
      .filter((categoryItem: CategoryItem) => !!this.category[categoryItem.categoryName])
      .map((categoryItem: CategoryItem) => this.category[categoryItem.categoryName]);
  }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe((data: { categoryListData: { categoryList: CategoryItem[] } }) => {
      const categoryList = data.categoryListData.categoryList;
      this.categoryList = categoryList;

      categoryList.forEach(
        (categoryItem: CategoryItem): void => {
          this.categoryService.getCategory(categoryItem.path).subscribe((categoryData: CategoryData) => {
            this.category[categoryItem.categoryName] = categoryData;
          });
        }
      );
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
