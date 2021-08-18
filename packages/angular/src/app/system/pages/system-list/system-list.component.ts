import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/user/services';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss']
})
export class SystemListComponent implements OnInit {
  currentRole: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // Obtener el rol actual del usuario autentificado.
    this.authService.getRoles()
      .subscribe(res => this.currentRole = res);
  }

  get roles() {
    return this.authService.roles;
  }

  checkRolAdmin(): boolean {
    return this.currentRole === this.roles.ROLE_ADMIN;
  }

  checkRolNetwork(): boolean {
    return this.currentRole === this.roles.ROLE_NETWORK
      || this.currentRole === this.roles.ROLE_ADMIN;
  }

}
