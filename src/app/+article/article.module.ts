import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { ArticleComponent } from './article.component';
import { ArticleResolver } from './article-resolve.service';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    RouterModule.forChild([
      {
        path: ':categoryName/:articleName',
        component: ArticleComponent,
        pathMatch: 'full',
        resolve: {
          article: ArticleResolver
        }
      }
    ]),
    CommonModule,
    HttpClientModule
  ],
  providers: [Title, ArticleResolver]
})
export class ArticleModule {}
