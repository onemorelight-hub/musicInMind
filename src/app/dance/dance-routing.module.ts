import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DancePage } from './dance.page';

const routes: Routes = [
  {
    path: '',
    component: DancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DancePageRoutingModule {}
