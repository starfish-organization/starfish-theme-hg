import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';

import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { HomeModule } from './+home/home.module';
import { ArticleModule } from './+article/article.module';
import { CategoryModule } from './+category/category.module';
import { CategoryListModule } from './+category-list/category-list.module';

import { AppRoutingModule } from './app.routing.modules';

import { NavComponent } from './nav/nav.component';
import { NavSoundSwitchComponent } from './nav-sound-switch/nav-sound-switch.component';
import { FooterLinkComponent } from './footer-link/footer-link.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,

    NavComponent,
    NavSoundSwitchComponent,
    FooterLinkComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    HttpModule,
    AppRoutingModule,

    HomeModule,
    ArticleModule,
    CategoryListModule,
    CategoryModule
  ],
  providers: [Title],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
