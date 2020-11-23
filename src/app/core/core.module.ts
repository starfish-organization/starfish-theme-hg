import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { CategoriesService } from './categorys.service';
import { RouterModule } from '@angular/router';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './http-interceptors/caching-interceptor';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [NavComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    CategoriesService,
  ],
  declarations: [NavComponent, NavLogoComponent]
})
export class CoreModule {}
