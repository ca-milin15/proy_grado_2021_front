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


  @ViewChild("video") videoRef: ElementRef;
  get video(): HTMLVideoElement {
    return this.videoRef.nativeElement
  }
  
  @ViewChild("canvas") canvasRef: ElementRef;
  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement
  }


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


  onStartBrowserComponent(){
    const hdConstraints = {
      video: { width: { min: 1280 }, height: { min: 720 } },
    };
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia(hdConstraints).then((ms: MediaStream) => {
        const _video = this.video;
        _video.srcObject = ms;
        _video.play(); 
      }).then(()=> {
        setInterval(function(video, canvas, listaCapturas, utilidadesService, sanitizer) {
          canvas.getContext("2d").drawImage(video, 0, 0, 640, 480);
          canvas.toBlob(function(blob){
            console.log();
            if (listaCapturas.length >= 3){
              listaCapturas.splice(0,1);
            }
            listaCapturas.push(sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
          });
          }, 3 * 1000, this.video, this.canvas, this.listaCapturas, this.utilidadesService, this.sanitizer); 
      });
    }
  }
  

  ngOnInit() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.dispositivoMovil = true;
      } else {
        console.log("not running on Android device!");
        this.dispositivoWeb = true;
        //this.onStartBrowserComponent();
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
