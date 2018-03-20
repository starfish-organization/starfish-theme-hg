import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';

import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { HomeModule } from './+home/home.module';
import { ArticleModule } from './+article/article.module';
import { CategoryModule } from './+category/category.module';

import { AppRoutingModule } from './app.routing.modules';

import { FooterLinkComponent } from './footer-link/footer-link.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, FooterLinkComponent, FooterComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    HttpModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    ArticleModule,
    CategoryModule
  ],
  providers: [Title],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
