import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user = {
    imgUrl: 'https://via.placeholder.com/500',
    email: 'email@email'
  };
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
