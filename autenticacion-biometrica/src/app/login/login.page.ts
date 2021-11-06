import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
    public utilidadesService: UtilidadesService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.version = environment.environment
  }

  continuar(){
    if (this.form.valid) {
      let payload = {
        usuario: this.form.value.usuario,
        clave: this.form.value.clave
      }
      this.autenticacionServiceService.ejecutarPeticion(this.autenticacionBasicaEndpoint, payload)
      .subscribe((ok) => {
        this.localStorageService.set('usuario', ok);
        this.navCtrl.navigateForward('folder');
      },(err) => {
        this.utilidadesService.errorProcess(err);
      });
    } else {
      this.utilidadesService.presentAlert('Atención!', 'Debe completar los campos del formulario.', '');
    }
   
  }
}
