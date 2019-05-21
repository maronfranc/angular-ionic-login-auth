import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/shared/user.model';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public lessonPlans: Credentials;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.storedCredentials();
  }

  async storedCredentials() {
    const userData = await Plugins.Storage.get({key: environment.storageAuth});
    this.lessonPlans =  JSON.parse(userData.value)['lessonPlans'];
  }

  onLogout() {
    this.authService.logout();
  }
}
