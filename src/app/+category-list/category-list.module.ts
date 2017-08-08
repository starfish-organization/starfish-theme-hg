import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CategoryListComponent } from './category-list.component';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    RouterModule.forChild([{ path: 'categorys', component: CategoryListComponent }]),
    CommonModule
  ],
  providers: [Title]
})
export class CategoryListModule {}
