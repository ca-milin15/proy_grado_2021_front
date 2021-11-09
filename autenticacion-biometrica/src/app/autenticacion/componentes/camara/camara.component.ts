import { Component, OnInit, Output, EventEmitter, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {CameraSource, CameraResultType, Camera, CameraDirection} from '@capacitor/camera';
import { UtilidadesService } from 'src/app/utilidades/utilidades.service';

import {isPlatformBrowser} from '@angular/common';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {

  @ViewChild('video', {static: true}) video: ElementRef<HTMLVideoElement>;

  image: SafeResourceUrl;
  imagespan: any;
  foto: any;
  dispositivoMovil: any = false;
  dispositivoWeb: any = false;
  platform: any;
  prueba: boolean = true;
  imagenUrl: any;

  @Output() fotografia = new EventEmitter();

  constructor(public utilidadesService: UtilidadesService, 
    private sanitizer: DomSanitizer,
    private plataforma: Platform,
    @Inject(PLATFORM_ID) private _platform: Object) {

    this.imagenUrl = '../../../../assets/user-biometric.png';
    this.platform = plataforma
  }

  onStartBrowserComponent(){
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({video: true}).then((ms: MediaStream) => {
        const _video = this.video.nativeElement;
        _video.srcObject = ms;
        _video.play(); 
      });
    }
  }



  ngOnInit() {
    // this.platform.ready().then(() => {
    //   if (this.platform.is('android')) {
    //     this.dispositivoMovil = true;
    //   } else {
    //     console.log("not running on Android device!");
    //     this.dispositivoWeb = true;
    //     this.onStartBrowserComponent();
    //   }
    // });
    this.dispositivoMovil = true;
  }

  async tomarFoto ()  {

    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Camera,
      direction: CameraDirection.Front,
      resultType: CameraResultType.Base64,
      presentationStyle: 'popover'
    });
    this.foto = this.utilidadesService.dataURItoBlob(this.image);
    this.imagenUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.foto));
  }

  async enviarFotografia ()  {
    console.log('emit this.image: ', this.image);
    this.fotografia.emit(this.image);
  }
}
