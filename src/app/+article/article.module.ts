import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    RouterModule.forChild([
      { path: ':categoryName/:articleName', component: ArticleComponent, pathMatch: 'full' }
    ])
  ],
  providers: [Title]
})
export class ArticleModule {}
