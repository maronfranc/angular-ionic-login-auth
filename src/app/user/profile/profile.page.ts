import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../shared/storage.service';
import { UserService } from '../user.service';
import { User } from 'src/app/shared/user.model';

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
    this.user = await this.storageService.getUser();
    if (!this.user) {
      this.user = {
        name: 'Erro de local storage',
        imageProfile: '/assets/img/user-placeholder.png'
      };
    }
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
