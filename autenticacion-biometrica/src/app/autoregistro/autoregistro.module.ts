import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoregistroPageRoutingModule } from './autoregistro-routing.module';

import { AutoregistroPage } from './autoregistro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoregistroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AutoregistroPage]
})
export class AutoregistroPageModule {}
