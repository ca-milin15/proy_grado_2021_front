import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraComponent } from './camara/camara.component';
import { MbscModule } from '@mobiscroll/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    MbscModule
  ],
  declarations: [CamaraComponent],
  exports: [CamaraComponent]
})
export class AutenticacionComponentesModule {}
