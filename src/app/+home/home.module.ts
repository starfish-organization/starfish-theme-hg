import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { FangweiComponent } from '../fangwei/fangwei.component';

@NgModule({
  declarations: [HomeComponent, FangweiComponent],
  imports: [RouterModule.forChild([{ path: '', component: HomeComponent, pathMatch: 'full' }])]
})
export class HomeModule {}
