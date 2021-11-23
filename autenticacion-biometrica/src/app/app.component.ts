import { Component} from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages;

  public labels = [];
  constructor(private plataforma: Platform) {
    plataforma.ready().then(() => {
      this.appPages= [
        { title: 'Autenticacion', url: 'autenticacion', icon: 'aperture', noHidden: plataforma.is('android') ? true : false },
        { title: 'Registro datos biometricos', url: 'registro', icon: 'person-add', noHidden: plataforma.is('android') ? false : true },
        { title: 'Salir', url: 'login', icon: 'exit', noHidden: false },
      ];
    });
  }
}
