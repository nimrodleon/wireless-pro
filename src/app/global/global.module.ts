import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AuthService} from '../user/services/auth.service';
import {UserService} from '../user/services/user.service';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class GlobalModule {
}
