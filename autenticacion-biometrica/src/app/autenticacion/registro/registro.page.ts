import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { UtilidadesService } from 'src/app/utilidades/utilidades.service';
import { AutenticacionServiceService } from 'src/app/autenticacion-service.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroEndpoint: string = '/registro/registrar-datos-biometricos';
  imageBlob: any;
  fotografia: any;
  usuario: any;

  constructor(private autenticacionServiceService: AutenticacionServiceService,
    public utilidadesService: UtilidadesService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.usuario = this.localStorageService.get('usuario');
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
    formData.append('idUsuario', this.usuario.id);

    this.utilidadesService.inicializarSpinner().then(() => {
      this.autenticacionServiceService.ejecutarPeticion(this.registroEndpoint, formData)
      .subscribe((ok) => {
        this.utilidadesService.presentAlert('Exito!', 'La operación se ha llevado a cabo exitosamente.', '');
        this.utilidadesService.detenerSpinner();
      },(err) => {
        this.utilidadesService.presentAlert('Error!', 'Ha ocurrido un error en la operación.', '');
        this.utilidadesService.detenerSpinner();
      });
    });
  }
}
