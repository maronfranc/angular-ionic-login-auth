import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children: [
      {
        path: 'cursos',
        children: [
          {
            path: '',
            loadChildren: './courses/courses.module#CoursesPageModule'
          }
        ]
      },
      {
        path: 'conta',
        children: [
          {
            path: '',
            loadChildren: './profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/user/conta',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user/conta',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
