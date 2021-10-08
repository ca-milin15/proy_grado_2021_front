import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Autenticacion', url: 'autenticacion', icon: 'aperture' },
    { title: 'Registro datos biometricos', url: 'registro', icon: 'person-add' },
  ];
  public labels = [];
  constructor() {}
}
