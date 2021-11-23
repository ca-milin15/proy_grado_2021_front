import { Component, OnInit, Output, EventEmitter, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {CameraSource, CameraResultType, Camera, CameraDirection} from '@capacitor/camera';
import { UtilidadesService } from 'src/app/utilidades/utilidades.service';

import {isPlatformBrowser} from '@angular/common';
import { Platform } from '@ionic/angular';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {


  @ViewChild("video") videoRef: ElementRef;
  get video(): HTMLVideoElement {
    return this.videoRef.nativeElement
  }
  
  @ViewChild("canvas") canvasRef: ElementRef;
  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement
  }


  contextoAplicacion: string = environment.url.concat('/autenticacion-biometrica/servicio/autenticacion');
  image: SafeResourceUrl;
  imagespan: any;
  foto: any;
  dispositivoMovil: any = false;
  dispositivoWeb: any = false;
  platform: any;
  prueba: boolean = true;
  imagenUrl: any;

  listaCapturas: any[] = new Array(0);

  @Output() fotografia = new EventEmitter();

  constructor(public utilidadesService: UtilidadesService, 
    private sanitizer: DomSanitizer,
    private plataforma: Platform,
    @Inject(PLATFORM_ID) private _platform: Object) {

    this.imagenUrl = '../../../../assets/user-biometric.png';
    this.platform = plataforma
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.dispositivoMovil = true;
      } else {
        //this.dispositivoMovil = true;
        this.dispositivoWeb = true;
      }
    });
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
    this.fotografia.emit(this.image);
  }
}
