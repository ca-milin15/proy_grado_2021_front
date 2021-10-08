import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutenticacionPageRoutingModule } from './autenticacion-routing.module';

import { AutenticacionPage } from './autenticacion.page';

import { AutenticacionComponentesModule } from '../componentes/componentes.module';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutenticacionPageRoutingModule,
    AutenticacionComponentesModule, 
    MbscModule
  ],
  declarations: [AutenticacionPage]
})
export class AutenticacionPageModule {}
