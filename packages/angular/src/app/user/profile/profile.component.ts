import {Component, OnInit} from '@angular/core';
// Local imports.
declare var jQuery: any;
import Swal from 'sweetalert2';
import {User} from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.getUser();
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
    jQuery('#app-password-modal').modal('show');
  }

  savePassword(passwd: any): void {
    this.userService.changePassword(this.user._id, passwd)
      .subscribe(res => {
        Swal.fire('Has cambiado tu contraseña!');
      }, err => {
        console.log(err);
        Swal.fire(`${err.error}!`);
      });
  }

}
