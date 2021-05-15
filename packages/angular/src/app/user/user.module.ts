import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { UserService } from './user.service';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserOutletComponent } from './user-outlet/user-outlet.component';
import { GlobalModule } from '../global/global.module';


@NgModule({
  declarations: [
    PasswordModalComponent,
    ProfileComponent,
    UserModalComponent,
    UserListComponent,
    UserOutletComponent
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
export class UserModule { }
