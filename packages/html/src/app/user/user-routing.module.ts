import {NgModule} from '@html/core';
import {Routes, RouterModule} from '@html/router';
import {ProfileComponent} from './pages/profile/profile.component';
import {UserListComponent} from './pages/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'list', component: UserListComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
