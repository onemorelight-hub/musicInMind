import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dance',
        loadChildren: () => import('../dance/dance.module').then(m => m.DancePageModule)
      },
      {
        path: 'movie',
        loadChildren: () => import('../movie/movie.module').then(m => m.MoviePageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'trends',
        loadChildren: () => import('../trends/trends.module').then(m => m.TrendsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/movie',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dance',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
