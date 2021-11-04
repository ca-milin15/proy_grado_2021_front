import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticacionServiceService } from '../../autenticacion-service.service';
import { UtilidadesService } from '../../utilidades/utilidades.service';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  autenticacionEndpoint: string = '/autenticacion';
  imageBlob: any;
  fotografia: any;
  
  constructor(private httpClient: HttpClient, 
    private autenticacionServiceService: AutenticacionServiceService, 
    public utilidadesService: UtilidadesService,
    private localStorageService: LocalStorageService) {
    // This is intentionally
  }

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

    this.autenticacionServiceService.ejecutarPeticion(this.autenticacionEndpoint, formData)
    .subscribe((ok) => {
      this.utilidadesService.presentAlert('Exito!', 'La operación se ha llevado a cabo exitosamente.', '');
    },(err) => {
      this.utilidadesService.presentAlert('Error!', 'Ha ocurrido un error en la operación.', '');
    });
  }

}
