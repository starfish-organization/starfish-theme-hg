import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ArticleContentComponent } from '../article-content/article-content.component';

@NgModule({
  declarations: [ButtonComponent, PaginationComponent, ArticleContentComponent],
  exports: [PaginationComponent, ArticleContentComponent],
  imports: [CommonModule],
})
export class ShareModule {}
