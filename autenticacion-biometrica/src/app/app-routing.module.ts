import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./autenticacion/autenticacion/autenticacion.module').then( m => m.AutenticacionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./autenticacion/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'autenticacion-fin-transac',
    loadChildren: () => import('./autenticacion-fin-transac/autenticacion-fin-transac.module').then( m => m.AutenticacionFinTransacPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
