import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RecentComponent } from './recent/recent.component';
import { ShareModule } from '../share/share.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [RecentComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RecentComponent,
        pathMatch: 'full',
      },
    ]),
    CommonModule,
    CoreModule,
    ShareModule,
  ],
  providers: [Title],
})
export class RecentModule {}
