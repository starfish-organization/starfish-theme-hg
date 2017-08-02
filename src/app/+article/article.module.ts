import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    RouterModule.forChild([
      { path: ':categoryName/:articleName', component: ArticleComponent, pathMatch: 'full' }
    ])
  ]
})
export class ArticleModule {}
