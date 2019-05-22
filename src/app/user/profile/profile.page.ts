import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../shared/storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user;

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit() {
    this.storedUser();
  }

  async storedUser() {
    try {
      this.user = await this.storageService.getUser();
    } catch (e) {
      console.log(e);
    }
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
