import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { GlitchBlockComponent } from '../glitch-block/glitch-block.component';
import { ShadowLinkComponent } from '../shadow-link/shadow-link.component';
import { CategorysService } from '../core/categorys.service';
import { CategorysResolver } from '../core/categorys-resolve.service';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from '../articles/articles.component';

@NgModule({
  declarations: [
    HomeComponent,
    FangweiComponent,
    GlitchBlockComponent,
    ShadowLinkComponent,
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        resolve: {
          categoryList: CategorysResolver
        }
      }
    ])
  ],
  providers: [Title, CategorysService]
})
export class HomeModule {}
