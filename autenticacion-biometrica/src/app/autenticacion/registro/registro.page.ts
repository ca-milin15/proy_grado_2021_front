import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { UtilidadesService } from 'src/app/utilidades/utilidades.service';
import { AutenticacionServiceService } from 'src/app/autenticacion-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroEndpoint: string = '/registro/registrar-datos-biometricos';
  imageBlob: any;
  fotografia: any;

  constructor(private httpClient: HttpClient, 
    private autenticacionServiceService: AutenticacionServiceService,
    public utilidadesService: UtilidadesService) { }

  ngOnInit() {
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

    this.autenticacionServiceService.ejecutarPeticion(this.registroEndpoint, formData)
    .subscribe((ok) => {
      this.utilidadesService.presentAlert('Exito!', 'La operación se ha llevado a cabo exitosamente.', '');
    },(err) => {
      this.utilidadesService.presentAlert('Error!', 'Ha ocurrido un error en la operación.', '');
    });
  }
}
