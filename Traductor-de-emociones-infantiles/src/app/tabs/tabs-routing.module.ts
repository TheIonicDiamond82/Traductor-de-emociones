import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'escribir',
        loadChildren: () =>
        import('../pages/escribir/escribir.module').then(m => m.EscribirPageModule)
      },
      {
        path: 'dibujar',
        loadChildren: () =>
        import('../pages/dibujar/dibujar.module').then(m => m.DibujarPageModule)
      },
      {
        path: 'camara',
        loadChildren: () =>
        import('../pages/camara/camara.module').then(m => m.CamaraPageModule)
      },
      {
        path: 'subir',
        loadChildren: () =>
        import('../pages/imagen/imagen.module').then(m => m.ImagenPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () =>
        import('../pages/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
