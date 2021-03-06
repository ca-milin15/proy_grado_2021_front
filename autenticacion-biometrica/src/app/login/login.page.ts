import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
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
  mostrarAutoregistro: boolean = false;

  constructor(private navCtrl: NavController,
    private autenticacionServiceService: AutenticacionServiceService,
    private utilidadesService: UtilidadesService,
    private localStorageService: LocalStorageService,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private plataforma: Platform) { }

  ngOnInit() {
    this.version = environment.environment
    this.menuCtrl.enable (false);
    this.plataforma.ready().then(() => {
      if (this.plataforma.is('android')) {
        this.mostrarAutoregistro = true;
      }
    });
  }

  ionViewWillEnter(){
    this.menuCtrl.enable (false);
  }

  autoRegistro(){
    this.navCtrl.navigateForward('autoregistro');
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
          this.menuCtrl.enable (true);
        }, (err) => {
          this.utilidadesService.errorProcess(err);
          this.utilidadesService.detenerSpinner();
        });
      });
    } else {
      this.utilidadesService.presentAlert('Atenci??n!', 'Debe completar los campos del formulario.', '');
    }
   
  }

}
