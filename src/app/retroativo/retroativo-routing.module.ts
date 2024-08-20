import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetroativoPage } from './retroativo.page';

const routes: Routes = [
  {
    path: '',
    component: RetroativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetroativoPageRoutingModule {}
