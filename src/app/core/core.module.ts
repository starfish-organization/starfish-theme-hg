import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { CategorysService } from './categorys.service';
import { CategorysResolveService } from './categorys-resolve.service';
import { RouterModule } from '@angular/router';
import { NavLogoComponent } from './nav-logo/nav-logo.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [NavComponent],
  providers: [CategorysService, CategorysResolveService],
  declarations: [NavComponent, NavLogoComponent]
})
export class CoreModule {}