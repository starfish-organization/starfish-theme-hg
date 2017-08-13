import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { GlitchBlockComponent } from '../glitch-block/glitch-block.component';
import { ShadowLinkComponent } from '../shadow-link/shadow-link.component';
import { CategorysService } from '../categorys.service';
import { CategorysResolveService } from '../categorys-resolve.service';

@NgModule({
  declarations: [HomeComponent, FangweiComponent, GlitchBlockComponent, ShadowLinkComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        resolve: {
          categoryList: CategorysResolveService
        }
      }
    ])
  ],
  providers: [Title, CategorysService]
})
export class HomeModule {}
