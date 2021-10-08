import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionServiceService {

  contextoAplicacion: string = 'http://localhost:5000/autenticacion-biometrica/servicio';
  objetoRespuesta: {
    status: Number
    body:  {}
  };

  constructor(private httpClient: HttpClient) { }

  ejecutarPeticion(url: string, body: any): any{
    return this.httpClient.post(
      this.contextoAplicacion.concat(url),
      body
    ).subscribe((res) => {
      this.objetoRespuesta.status = 200;
      return this.objetoRespuesta;
    }, (err) => {
      this.objetoRespuesta.status = 400;
      return this.objetoRespuesta;
    });
  }

}
