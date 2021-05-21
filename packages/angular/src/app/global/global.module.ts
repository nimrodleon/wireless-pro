import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterLinkComponent } from './router-link/router-link.component';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    RouterLinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    RouterLinkComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class GlobalModule { }
