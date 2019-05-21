import { Component, OnInit } from '@angular/core';

import { Plugins } from '@capacitor/core';

import { Credentials } from '../../shared/user.model';
import { UserService } from '../user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public lessonPlans: Credentials;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.storedCredentials();
  }

  async storedCredentials() {
    const userData = await Plugins.Storage.get({key: environment.storageAuth});
    this.lessonPlans =  JSON.parse(userData.value)['lessonPlans'];
  }

  onLogout() {
    this.userService.confirmLogout();
  }
}
