import {Component, OnInit} from '@angular/core';

declare var bootstrap: any;
import Swal from 'sweetalert2';
import {User} from '../../interfaces';
import {UserService} from '../../services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Array<User>;
  currentUser: User;
  titleModal: string = '';
  editMode: boolean = false;
  chkStatus: boolean = false;
  userModal: any;
  passwordChangeModal: any;

  constructor(
    private userService: UserService) {
    this.currentUser = this.userService.userDefaultValues();
  }

  ngOnInit(): void {
    this.getUsers();
    // vincular modal del componente.
    this.userModal = new bootstrap.Modal(
      document.querySelector('#app-user-modal'));
    this.passwordChangeModal = new bootstrap.Modal(
      document.querySelector('#app-password-modal'));
  }

  // Obtener lista de usuarios.
  private getUsers(): void {
    this.userService.getUsers(this.chkStatus)
      .subscribe(res => this.users = res);
  }

  // Change status value.
  onChangeStatus(checked: boolean): void {
    this.chkStatus = checked;
    this.getUsers();
  }

  // New User.
  addUser(): void {
    this.editMode = false;
    this.titleModal = 'Agregar Usuario';
    this.currentUser = this.userService.userDefaultValues();
    this.userModal.show();
  }

  // User Edit.
  editUser(id: string): void {
    this.titleModal = 'Editar Usuario';
    this.userService.getUser(id).subscribe(res => {
      this.editMode = true;
      this.currentUser = res;
      this.userModal.show();
    });
  }

  // Save User Values.
  saveChanges(user: User): void {
    if (user._id === undefined) {
      this.userService.create(user)
        .subscribe(() => this.getUsers());
    } else {
      this.userService.update(user)
        .subscribe(() => this.getUsers());
    }
    this.editMode = false;
    this.userModal.hide();
  }

  // Open Modal Change Password.
  onChangePassword(event, id: string): void {
    event.preventDefault();
    this.userService.getUser(id).subscribe(res => {
      this.currentUser = res;
      this.passwordChangeModal.show();
    });
  }

  // Save Password.
  savePassword(passwd: any): void {
    if (passwd.current) {
      this.userService.changePassword(this.currentUser._id, passwd)
        .subscribe(res => {
          Swal.fire('La Contraseña ha sido cambiada!');
        });
    }
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de borrar?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(() => {
          this.getUsers();
          Swal.fire(
            'Borrado!',
            'El registro ha sido borrado.',
            'success'
          );
        });
      }
    });
  }

}
