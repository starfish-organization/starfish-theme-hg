import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./+home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: ':categoryName/:articleName',
    loadChildren: () => import('./+article/article.module').then((m) => m.ArticleModule),
  },
  {
    path: 'articles', // recent page
    loadChildren: () => import('./+recent/recent.module').then((m) => m.RecentModule),
  },
  {
    path: 'category', // 兼容 SEO
    loadChildren: () => import('./+archive/archive.module').then((m) => m.ArchiveModule),
  },
  {
    path: 'archive',
    loadChildren: () => import('./+archive/archive.module').then((m) => m.ArchiveModule),
  },
  {
    path: 'aboutme',
    loadChildren: () => import('./+aboutme/aboutme.module').then((m) => m.AboutmeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
