import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoregistroPage } from './autoregistro.page';

const routes: Routes = [
  {
    path: '',
    component: AutoregistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoregistroPageRoutingModule {}
