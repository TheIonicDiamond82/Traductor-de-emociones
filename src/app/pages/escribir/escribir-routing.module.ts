import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscribirPage } from './escribir.page';

const routes: Routes = [
  {
    path: '',
    component: EscribirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscribirPageRoutingModule {}
