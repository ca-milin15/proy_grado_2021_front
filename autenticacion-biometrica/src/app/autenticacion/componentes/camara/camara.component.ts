import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import {CameraSource, CameraResultType, Camera} from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {

  image: SafeResourceUrl;
  imagespan: any;
  foto: any;
  @Output() fotografia = new EventEmitter();

  constructor() {
    this.image = '../../../../assets/user-biometric.png';
  }

  ngOnInit() {}

  async tomarFoto ()  {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64,
      presentationStyle: 'popover'
    });
    console.log('image: ', image);
    this.fotografia.emit(image);
  }

}
