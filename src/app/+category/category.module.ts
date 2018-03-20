import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CategoryComponent } from './category.component';
import { CategorysService } from '../core/categorys.service';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    RouterModule.forChild([
      { path: 'category', component: CategoryComponent },
      { path: ':categoryName', component: CategoryComponent },
    ]),
    CommonModule
  ],
  providers: [Title, CategorysService]
})
export class CategoryModule {}
