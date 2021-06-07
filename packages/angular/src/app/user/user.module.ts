import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {AuthService} from './services/auth.service';
import {TokenInterceptorService} from './services/token-interceptor.service';
import {UserService} from './services/user.service';
import {PasswordModalComponent} from './components/password-modal/password-modal.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {UserModalComponent} from './components/user-modal/user-modal.component';
import {UserListComponent} from './pages/user-list/user-list.component';
import {GlobalModule} from '../global/global.module';

@NgModule({
  declarations: [
    PasswordModalComponent,
    ProfileComponent,
    UserModalComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
