import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.storedUser();
  }

  async storedUser() {
    const userData = await Plugins.Storage.get({key: environment.storageUser});
    this.user =  JSON.parse(userData.value);
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
