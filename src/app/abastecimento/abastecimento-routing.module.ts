import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbastecimentoPage } from './abastecimento.page';

const routes: Routes = [
  {
    path: '',
    component: AbastecimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbastecimentoPageRoutingModule {}
