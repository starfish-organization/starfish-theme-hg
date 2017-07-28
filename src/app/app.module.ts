import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { HomeModule } from './+home/home.module';

import { AppRoutingModule } from './app.routing.modules';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [AppComponent, CategoryListComponent, CategoryComponent, ArticleComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    HttpModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
