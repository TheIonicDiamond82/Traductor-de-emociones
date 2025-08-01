import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscribirPageRoutingModule } from './escribir-routing.module';

import { EscribirPage } from './escribir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscribirPageRoutingModule
  ],
  declarations: [EscribirPage]
})
export class EscribirPageModule {}
