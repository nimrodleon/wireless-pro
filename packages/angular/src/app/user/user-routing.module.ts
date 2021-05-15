import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserOutletComponent } from './user-outlet/user-outlet.component';

const routes: Routes = [
  {
    path: 'user', component: UserOutletComponent, children: [
      { path: 'list', component: UserListComponent },
      { path: 'profile', component: ProfileComponent }
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
