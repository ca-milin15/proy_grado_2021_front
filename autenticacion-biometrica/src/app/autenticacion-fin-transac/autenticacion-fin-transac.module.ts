import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutenticacionFinTransacPageRoutingModule } from './autenticacion-fin-transac-routing.module';

import { AutenticacionFinTransacPage } from './autenticacion-fin-transac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutenticacionFinTransacPageRoutingModule
  ],
  declarations: [AutenticacionFinTransacPage]
})
export class AutenticacionFinTransacPageModule {}
