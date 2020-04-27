import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { GlitchBlockComponent } from '../glitch-block/glitch-block.component';
import { ShadowLinkComponent } from '../shadow-link/shadow-link.component';
import { CategoriesService } from '../core/categorys.service';
import { CategoryResolver } from '../+category/categorys-resolve.service';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from '../articles/articles.component';

@NgModule({
  declarations: [HomeComponent, FangweiComponent, GlitchBlockComponent, ShadowLinkComponent, ArticlesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        resolve: {
          categoryList: CategoryResolver
        }
      }
    ])
  ],
  providers: [Title, CategoriesService]
})
export class HomeModule {}
