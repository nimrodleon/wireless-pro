import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/user/services';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html'
})
export class SystemListComponent implements OnInit {
  currentRole: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // Obtener el rol actual del usuario autentificado.
    this.authService.getRoles()
      .subscribe((res: string) => this.currentRole = res);
  }

  get roles() {
    return this.authService.roles;
  }

  checkRolAdmin(): boolean {
    return this.currentRole === this.roles.admin;
  }

  checkRolRedes(): boolean {
    return this.currentRole === this.roles.redes
      || this.currentRole === this.roles.admin;
  }

}
