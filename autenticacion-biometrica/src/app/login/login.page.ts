import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AutenticacionServiceService } from '../autenticacion-service.service';
import { UtilidadesService } from '../utilidades/utilidades.service';

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

  constructor(private navCtrl: NavController,
    private autenticacionServiceService: AutenticacionServiceService,
    public utilidadesService: UtilidadesService) { }

  ngOnInit() {
  }

  continuar(){
    if (this.form.valid) {
      let payload = {
        usuario: this.form.value.usuario,
        clave: this.form.value.clave
      }
      this.autenticacionServiceService.ejecutarPeticion(this.autenticacionBasicaEndpoint, payload)
      .subscribe((ok) => {
        this.navCtrl.navigateForward('folder')
      },(err) => {
        console.log('err: ', err)
        this.utilidadesService.presentAlert('Atención!',  err.error.mensaje , '');
      });
    } else {
      this.utilidadesService.presentAlert('Atención!', 'Debe completar los campos del formulario.', '');
    }
   
  }
}
