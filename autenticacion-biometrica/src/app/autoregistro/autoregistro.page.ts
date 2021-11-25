import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { LocalStorageService } from 'angular-web-storage';
import { AutenticacionServiceService } from '../autenticacion-service.service';
import { UtilidadesService } from '../utilidades/utilidades.service';

@Component({
  selector: 'app-autoregistro',
  templateUrl: './autoregistro.page.html',
  styleUrls: ['./autoregistro.page.scss'],
})
export class AutoregistroPage implements OnInit {

  autoregistroEndpoint: string = '/usuario/autoregistro';

  form = new FormGroup({
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    identificacion: new FormControl('', Validators.required)
  });
  
  constructor(private navCtrl: NavController,
    private autenticacionServiceService: AutenticacionServiceService,
    private utilidadesService: UtilidadesService,
    private localStorageService: LocalStorageService,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  continuar(){
    if (this.form.valid) {
      let payload = {
        usuario: this.form.value.usuario,
        clave: this.form.value.clave,
        nombre: this.form.value.nombre,
        apellidos: this.form.value.apellidos,
        identificacion: this.form.value.identificacion
      }
      
      this.utilidadesService.inicializarSpinner().then(() => {
        this.autenticacionServiceService.ejecutarPeticion(this.autoregistroEndpoint, payload)
        .subscribe((ok) => {
          this.navCtrl.navigateForward('login');
          this.utilidadesService.detenerSpinner();
        }, (err) => {
          this.utilidadesService.presentAlert('Atención!', err.error.mensaje, '');
          this.utilidadesService.detenerSpinner();
        });
      });
    } else {
      this.utilidadesService.presentAlert('Atención!', 'Debe completar los campos del formulario.', '');
    }
   
  }
}
