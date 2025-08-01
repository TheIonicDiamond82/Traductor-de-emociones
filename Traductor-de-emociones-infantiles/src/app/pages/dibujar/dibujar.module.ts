import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DibujarPageRoutingModule } from './dibujar-routing.module';

import { DibujarPage } from './dibujar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DibujarPageRoutingModule
  ],
  declarations: [DibujarPage]
})
export class DibujarPageModule {}
