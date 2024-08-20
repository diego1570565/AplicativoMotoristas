import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'rotas',
    loadChildren: () => import('./rotas/rotas.module').then( m => m.RotasPageModule)
  },

  {
    path: 'sair',
    loadChildren: () => import('./sair/sair.module').then( m => m.SairPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'registros',
    loadChildren: () => import('./registros/registros.module').then( m => m.RegistrosPageModule)
  },
  {
    path: 'abastecimento',
    loadChildren: () => import('./abastecimento/abastecimento.module').then( m => m.AbastecimentoPageModule)
  },
  {
    path: 'retroativo',
    loadChildren: () => import('./retroativo/retroativo.module').then( m => m.RetroativoPageModule)
  },
  {
    path: 'combustivel',
    loadChildren: () => import('./combustivel/combustivel.module').then( m => m.CombustivelPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
