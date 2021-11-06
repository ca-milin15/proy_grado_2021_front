import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {CameraSource, CameraResultType, Camera, CameraDirection} from '@capacitor/camera';
import { UtilidadesService } from 'src/app/utilidades/utilidades.service';

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

  constructor(public utilidadesService: UtilidadesService, 
    private sanitizer: DomSanitizer) {
    this.image = '../../../../assets/user-biometric.png';
  }

  ngOnInit() {}

  async tomarFoto ()  {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Camera,
      direction: CameraDirection.Front,
      resultType: CameraResultType.Base64,
      presentationStyle: 'popover'
    });
    this.foto = this.utilidadesService.dataURItoBlob(image);
    this.image = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.foto));
    this.fotografia.emit(image);
  }

}
