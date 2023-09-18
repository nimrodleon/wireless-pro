import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {GlobalModule} from '../global/global.module';
import {AuthService, TokenInterceptorService, UserService} from './services';
import {PasswordModalComponent} from './components/password-modal/password-modal.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {UserModalComponent} from './components/user-modal/user-modal.component';
import {UserListComponent} from './pages/user-list/user-list.component';

@NgModule({
  declarations: [
    PasswordModalComponent,
    ProfileComponent,
    UserModalComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    GlobalModule
  ],
  providers: [
    AuthService,
    TokenInterceptorService,
    UserService
  ]
})
export class UserModule {
}
