import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CategoryComponent } from './category.component';
import { CategorysService } from '../core/categorys.service';
import { CategorysResolver } from '../core/categorys-resolve.service';
import { RecentArticlesComponent } from '../recent-articles/recent-articles.component';

@NgModule({
  declarations: [CategoryComponent, RecentArticlesComponent],
  imports: [
    RouterModule.forChild([
      {
        path: 'categorys',
        component: CategoryComponent,
        resolve: {
          categoryListData: CategorysResolver
        }
      }
    ]),
    CommonModule
  ],
  providers: [Title, CategorysService]
})
export class CategoryModule {}
