import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [ButtonComponent, PaginationComponent],
  exports: [PaginationComponent],
  imports: [CommonModule],
})
export class ShareModule {}
