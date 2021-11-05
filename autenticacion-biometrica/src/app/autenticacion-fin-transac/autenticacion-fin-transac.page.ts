import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-autenticacion-fin-transac',
  templateUrl: './autenticacion-fin-transac.page.html',
  styleUrls: ['./autenticacion-fin-transac.page.scss'],
})
export class AutenticacionFinTransacPage implements OnInit {

  usuario: any;
  foto: any;

  constructor(private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.usuario = this.localStorageService.get('usuario')
    console.log('AutenticacionFinTransacPage this.usuario: ', this.usuario);
    this.foto = this.sanitizer.bypassSecurityTrustUrl(this.usuario.urlFotografiaRegistrada);
  }

}
