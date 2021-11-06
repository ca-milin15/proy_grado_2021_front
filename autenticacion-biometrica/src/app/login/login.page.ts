import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { LocalStorageService } from 'angular-web-storage';
import { AutenticacionServiceService } from '../autenticacion-service.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  autenticacionBasicaEndpoint: string = '/usuario/autenticacion-basica';

  form = new FormGroup({
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required)
  });
  version: any;

  constructor(private navCtrl: NavController,
    private autenticacionServiceService: AutenticacionServiceService,
    private utilidadesService: UtilidadesService,
    private localStorageService: LocalStorageService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.version = environment.environment
  }

  continuar(){
    if (this.form.valid) {
      let payload = {
        usuario: this.form.value.usuario,
        clave: this.form.value.clave
      }
      
      this.utilidadesService.inicializarSpinner().then(() => {
        this.autenticacionServiceService.ejecutarPeticion(this.autenticacionBasicaEndpoint, payload)
        .subscribe((ok) => {
          this.localStorageService.set('usuario', ok);
          this.navCtrl.navigateForward('folder');
          this.utilidadesService.detenerSpinner();
        }, (err) => {
          this.utilidadesService.errorProcess(err);
          this.utilidadesService.detenerSpinner();
        });
      });
    } else {
      this.utilidadesService.presentAlert('Atención!', 'Debe completar los campos del formulario.', '');
    }
   
  }

}
