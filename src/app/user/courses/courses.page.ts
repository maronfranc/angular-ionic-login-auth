import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

import { Credentials } from '../../shared/user-auth.model';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public lessonPlans: Credentials;
  private usaaer: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.storedUser();
    this.storedCredentials();
  }

  async storedUser() {
    const userData = await Plugins.Storage.get({key: environment.storageUser});
    this.usaaer =  JSON.parse(userData.value);
  }

  async storedCredentials() {
    const userData = await Plugins.Storage.get({key: environment.storageAuth});
    this.lessonPlans =  JSON.parse(userData.value)['lessonPlans'];
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
