import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  constructor(private httpClient: HttpClient) {
    // This is intentionally
  }

  ngOnInit() {
  }

  procesarFotografia (fotografia) {
    console.log('fotografia: ', fotografia)
    const base64 = fotografia;
    const imageName = 'name.png';
    const imageBlob = this.dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    let formData = new FormData();

    formData.append('fotografia', imageFile);
    console.log('blob: ', imageFile)

    this.httpClient.post(
      'http://localhost:5000/autenticacion-biometrica/servicio/registro/registrar-datos-biometricos',
      formData
    ).subscribe((res) => {
      console.log('res: ', res);
    }, (err) => {
      console.log('err: ', err);
    });

  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
 }
}
