import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}


  // Executa login do auth.service.ts e abre janela com erro
  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Entrando...' })
      .then(loadingEl => {
        loadingEl.present();
        const authObs: Observable<any> = this.authService.login(email, password);
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            Plugins.Storage.set({ key: environment.storageUser , value: JSON.stringify(resData) });
            loadingEl.dismiss();
            this.router.navigateByUrl('/user');
          },
          errRes => {
            console.log(errRes);
            loadingEl.dismiss();
            let message;
            if (errRes.status === 502) {
              message = 'Algum erro no servidor, Por favor volte mais Tarde';
            } else {
              message = errRes.error.errors[0].detail.message;
            }
            this.showAlert(message);
          }
        );
      });
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Erro de autenticação',
        message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }
}
