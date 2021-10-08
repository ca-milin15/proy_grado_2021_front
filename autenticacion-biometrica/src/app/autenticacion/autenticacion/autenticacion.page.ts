import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticacionServiceService } from '../../autenticacion-service.service';
import { UtilidadesService } from '../../utilidades/utilidades.service';


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  autenticacionEndpoint: string = '/autenticacion';

  constructor(private httpClient: HttpClient, 
    private autenticacionServiceService: AutenticacionServiceService, 
    public utilidadesService: UtilidadesService) {
    // This is intentionally
  }

  ngOnInit() {
  }

  procesarFotografia (fotografia) {
    console.log('fotografia: ', fotografia)
    const imageName = new Date().getTime().toString().concat('.').concat(fotografia.format);
    const imageBlob = this.utilidadesService.dataURItoBlob(fotografia);
    const imageFile = new File([imageBlob], imageName, { type: 'image/'.concat(fotografia.format) });
    let formData = new FormData();
    formData.append('fotografia', imageFile);
    let respuesta = this.autenticacionServiceService.ejecutarPeticion(this.autenticacionEndpoint, formData);
    if(respuesta.status === 200){
      this.utilidadesService.presentAlert('Exito!', 'La operación se ha llevado a cabo exitosamente.', '');
    } else {
      this.utilidadesService.presentAlert('Error!', 'Ha ocurrido un error en la operación.', '');
    }
  }

}
