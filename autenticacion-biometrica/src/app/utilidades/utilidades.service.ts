import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  loading: any;

  constructor(public alertController: AlertController,
    private  loadingController: LoadingController) { }

  async presentAlert(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI.base64String);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/'.concat(dataURI.format) });
    return blob;
 }

  errorProcess(err) {
    if(err.status === 0){
      this.presentAlert('Atención!',  'No se pudo llevar a cabo la transaccion porque no tuvo conexion con el servidor.', err.message);
    } else {
      this.presentAlert('Atención!',  err.error.mensaje , '');
    }
  }


  async inicializarSpinner (){
    this.loading = await this.loadingController.create({
      cssClass: 'spinner-class',
      message: 'Procesando...',
      spinner: 'crescent',
      translucent: true
    });
    return await this.loading.present();
  }

  async detenerSpinner() {
    if (this.loading) {
      this.loading.dismiss()
      this.loading = null
      this.loading = false
    }
  }
}

