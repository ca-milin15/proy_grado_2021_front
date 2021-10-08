import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { AutenticacionComponentesModule } from '../componentes/componentes.module';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutenticacionComponentesModule,
    RegistroPageRoutingModule, 
    MbscModule
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
