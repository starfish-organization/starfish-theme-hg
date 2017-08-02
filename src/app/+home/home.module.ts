import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { FangweiComponent } from '../fangwei/fangwei.component';
import { GlitchBlockComponent } from '../glitch-block/glitch-block.component';
import { ShadowLinkComponent } from '../shadow-link/shadow-link.component';

@NgModule({
  declarations: [HomeComponent, FangweiComponent, GlitchBlockComponent, ShadowLinkComponent],
  imports: [RouterModule.forChild([{ path: '', component: HomeComponent, pathMatch: 'full' }])]
})
export class HomeModule {}
