import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, private alertCtrl: AlertController) { }

  async confirmLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar saida',
      buttons: [
        {
          text: 'OK',
          handler: () => { this.authService.logout(); }
        },
        {
          text: 'CANCELAR',
        }
      ]
    });
    await alert.present();
  }
}
