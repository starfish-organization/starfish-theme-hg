import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArticleComponent } from './article.component';
import { ShareModule } from '../share/share.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ArticleComponent,
        pathMatch: 'full'
      },
    ]),
    CommonModule,
    CoreModule,
    ShareModule,
    HttpClientModule,
  ],
  providers: [Title],
})
export class ArticleModule {}
