import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getUserStorage();
  }

  async getUserStorage() {
    const userData = await Plugins.Storage.get({key: environment.storageUser});
    this.user =  JSON.parse(userData.value);
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
