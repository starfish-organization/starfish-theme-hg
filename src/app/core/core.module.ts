import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { CategorysService } from './categorys.service';
import { NavSoundSwitchComponent } from './nav-sound-switch/nav-sound-switch.component';
import { CategorysResolveService } from './categorys-resolve.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [NavComponent],
  providers: [CategorysService, CategorysResolveService],
  declarations: [NavComponent, NavSoundSwitchComponent]
})
export class CoreModule {}
