import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  // { path: '', loadChildren: 'app/+home/home.module#HomeModule' },
  { path: 'categorys', component: CategoryListComponent },
  { path: ':categoryName', component: CategoryComponent },
  {
    path: ':categoryName/:articleName',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
