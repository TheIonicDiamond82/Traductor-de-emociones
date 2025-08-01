import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DibujarPage } from './dibujar.page';

const routes: Routes = [
  {
    path: '',
    component: DibujarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DibujarPageRoutingModule {}
