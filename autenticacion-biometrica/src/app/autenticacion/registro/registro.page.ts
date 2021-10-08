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

  constructor(private httpClient: HttpClient, 
    private autenticacionServiceService: AutenticacionServiceService,
    public utilidadesService: UtilidadesService) { }

  ngOnInit() {
  }

  procesarFotografia (fotografia) {
    console.log('fotografia: ', fotografia)
    const imageName = new Date().getTime().toString().concat('.').concat(fotografia.format);
    const imageBlob = this.utilidadesService.dataURItoBlob(fotografia);
    const imageFile = new File([imageBlob], imageName, { type: 'image/'.concat(fotografia.format) });
    let formData = new FormData();
    let respuesta = this.autenticacionServiceService.ejecutarPeticion(this.registroEndpoint, formData);
    if(respuesta.status === 200){
      this.utilidadesService.presentAlert('Exito!', 'La operación se ha llevado a cabo exitosamente.', '');
    } else {
      this.utilidadesService.presentAlert('Error!', 'Ha ocurrido un error en la operación.', '');
    }
  }


}
