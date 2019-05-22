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
  }

  async getStoredUser() {
    try {
      this.user = await this.storageService.getUser();
    } catch (e) {
      console.log(e);
    }
  }

  async getStoredLessonsPlans() {
    try {
      this.lessonPlans = await this.storageService.getCredentials();
    } catch (e) {
      console.log(e);
    }
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
