import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionServiceService {

  //contextoAplicacion: string = 'http://54.208.17.40:5000/autenticacion-biometrica/servicio';
  contextoAplicacion: string = environment.url.concat('/autenticacion-biometrica/servicio');
  objetoRespuesta: {
    status: Number
    body:  {}
  };

  constructor(private httpClient: HttpClient) { }

  ejecutarPeticion(url: string, body: any): any{
    return this.httpClient.post(
      this.contextoAplicacion.concat(url),
      body
    );
  }

  ejecutarPeticionParaRetornarArchivo(url: string, body: any): any{

    return this.httpClient.post(
      this.contextoAplicacion.concat(url),
      body, 
      { responseType: 'blob' }
    );
  }
}
