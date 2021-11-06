import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticacionServiceService } from '../../autenticacion-service.service';
import { UtilidadesService } from '../../utilidades/utilidades.service';
import { LocalStorageService } from 'angular-web-storage';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  autenticacionEndpoint: string = '/autenticacion';
  imageBlob: any;
  fotografia: any;
  usuario: any;
  
  constructor(
    private autenticacionServiceService: AutenticacionServiceService, 
    public utilidadesService: UtilidadesService,
    private localStorageService: LocalStorageService,
    private navCtrl: NavController) {
    // This is intentionally
  }

  ngOnInit() {
    this.usuario = this.localStorageService.get('usuario')
  }

  procesarFotografia (fotografia) {
    this.imageBlob = this.utilidadesService.dataURItoBlob(fotografia);
    this.fotografia = fotografia;
  }

  enviarFotografia () {
    const imageName = new Date().getTime().toString().concat('.').concat(this.fotografia.format);
    const imageFile = new File([this.imageBlob], imageName, { type: 'image/'.concat(this.fotografia.format) });
    let formData = new FormData();
    formData.append('fotografia', imageFile);

    this.utilidadesService.inicializarSpinner().then(() => {
      this.autenticacionServiceService.ejecutarPeticionParaRetornarArchivo(this.autenticacionEndpoint, formData)
      .subscribe((ok) => {
        this.usuario.urlFotografiaRegistrada = URL.createObjectURL(ok);
        this.localStorageService.set('usuario', this.usuario);
        this.navCtrl.navigateForward('autenticacion-fin-transac');
      },(err) => {
        this.utilidadesService.presentAlert('Error!', 'Ha ocurrido un error en el proceso de autenticacion biometrica.', '');
      });
      this.utilidadesService.detenerSpinner();
    });
  }

}
