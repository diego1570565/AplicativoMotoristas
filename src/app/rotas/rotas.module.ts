import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotasPageRoutingModule } from './rotas-routing.module';

import { RotasPage } from './rotas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotasPageRoutingModule
  ],
  declarations: [RotasPage]
})
export class RotasPageModule {}
