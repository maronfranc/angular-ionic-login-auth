import { Component } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user;
  public isAuth: boolean;

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.storedUser();
  }

  async storedUser() {
    this.user = await this.storageService.getUser();
    this.isAuth = !!this.user;
  }
}
