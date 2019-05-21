import { Component, OnInit } from '@angular/core';
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
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

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
            loadingEl.dismiss();
            console.log(errRes);
            const message = errRes.error.errors[0].detail.message;
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
