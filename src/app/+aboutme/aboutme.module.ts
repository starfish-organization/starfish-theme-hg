import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AboutmeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutmeComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class AboutmeModule {}
