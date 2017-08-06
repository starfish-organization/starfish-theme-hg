import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  // { path: '', loadChildren: 'app/+home/home.module#HomeModule' },
  { path: 'categorys', component: CategoryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
