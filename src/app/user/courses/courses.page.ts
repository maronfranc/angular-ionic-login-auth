import { Component, OnInit } from '@angular/core';

import { Credentials } from '../../shared/user-auth.model';
import { UserService } from '../user.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public lessonPlans: Credentials;
  public user;

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit() {
    this.getStoredUser();
    this.getStoredLessonsPlans();
  }

  async getStoredUser() {
    this.user = await this.storageService.getUser();
    if (!this.user) {
      this.user = {
        name: 'Erro de local storage',
        imageProfile: '/assets/img/user-placeholder.png'
      };
    }
  }

  async getStoredLessonsPlans() {
    this.lessonPlans = await this.storageService.getCredentials();
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
