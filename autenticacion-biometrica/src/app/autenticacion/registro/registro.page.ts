import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  procesarFotografia (fotografia) {
    console.log('fotografia: ', fotografia)
    let formData = new FormData();
    formData.append('fotografia', fotografia);
    this.httpClient.post(
      'http://localhost:5000/autenticacion-biometrica/servicio/registro/registrar-datos-biometricos',
      formData
    ).subscribe((res) => {
      console.log('res: ', res);
    }, (err) => {
      console.log('err: ', err);
    });
  }
}
