import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutenticacionFinTransacPage } from './autenticacion-fin-transac.page';

const routes: Routes = [
  {
    path: '',
    component: AutenticacionFinTransacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacionFinTransacPageRoutingModule {}
