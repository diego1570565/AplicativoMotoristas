import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetroativoPageRoutingModule } from './retroativo-routing.module';

import { RetroativoPage } from './retroativo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetroativoPageRoutingModule
  ],
  declarations: [RetroativoPage]
})
export class RetroativoPageModule {}
