import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RecentComponent } from './recent/recent.component';

@NgModule({
  declarations: [RecentComponent],
  imports: [
    RouterModule.forChild([
    ]),
    CommonModule
  ],
  providers: [Title]
})
export class RecentModule {}
