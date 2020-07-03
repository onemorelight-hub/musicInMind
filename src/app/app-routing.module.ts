import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'movie',
    loadChildren: () => import('./movie/movie.module').then( m => m.MoviePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'trends',
    loadChildren: () => import('./trends/trends.module').then( m => m.TrendsPageModule)
  },
  {
    path: 'dance',
    loadChildren: () => import('./dance/dance.module').then( m => m.DancePageModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./pages/play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
