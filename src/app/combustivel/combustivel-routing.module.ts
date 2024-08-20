import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CombustivelPage } from './combustivel.page';

const routes: Routes = [
  {
    path: '',
    component: CombustivelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombustivelPageRoutingModule {}
