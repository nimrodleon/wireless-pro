import {Component, OnInit} from '@angular/core';
// Local imports.
declare var jQuery: any;
declare var bootstrap: any;
import Swal from 'sweetalert2';
import {User} from '../../interfaces';
import {UserService} from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  passwordChangeModal: any;

  constructor(
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
    // Vincular modal del componente.
    this.passwordChangeModal = new bootstrap.Modal(
      document.querySelector('#app-password-modal'));
  }

  private getUser(): void {
    this.userService.getCurrentUser().subscribe(res => this.user = res);
  }

  update(): void {
    this.userService.update(this.user).subscribe(res => {
      this.user = res;
      Swal.fire('Su Información ha sido guardado!');
    });
  }

  changePassword(): void {
    this.passwordChangeModal.show();
  }

  savePassword(passwd: any): void {
    this.userService.changePassword(this.user._id, passwd)
      .subscribe(res => {
        Swal.fire('Has cambiado tu contraseña!');
      }, err => {
        Swal.fire(`${err.error}!`);
      });
  }

}
