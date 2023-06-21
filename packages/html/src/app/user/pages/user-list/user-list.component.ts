import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../interfaces';
import { UserService } from '../../services';
import { Sweetalert2 } from 'src/app/global/interfaces';

declare const bootstrap: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: Array<User> = new Array<User>();
  currentUser: User;
  currentUserId: string = '';
  titleModal: string = '';
  editMode: boolean = false;
  chkStatus: boolean = false;
  userModal: any;
  passwordChangeModal: any;

  constructor(
    private userService: UserService) {
    this.currentUser = this.userService.defaultValues();
  }

  ngOnInit(): void {
    this.getUsers();
    // vincular modal del componente.
    this.userModal = new bootstrap.Modal('#app-user-modal');
    this.passwordChangeModal = new bootstrap.Modal('#app-password-modal');
  }

  // Obtener lista de usuarios.
  private getUsers(): void {
    this.userService.getUsers(this.chkStatus)
      .subscribe(res => this.users = res);
  }

  // Cambiar estado actual.
  onChangeStatus(checked: boolean): void {
    this.chkStatus = checked;
    this.getUsers();
  }

  // New User.
  addUser(): void {
    this.editMode = false;
    this.titleModal = 'Agregar Usuario';
    this.currentUser = this.userService.defaultValues();
    this.userModal.show();
  }

  // User Edit.
  editUser(id: string): void {
    this.titleModal = 'Editar Usuario';
    this.userService.getUserById(id).subscribe(res => {
      this.editMode = true;
      this.currentUser = res;
      this.userModal.show();
    });
  }

  // Save User Values.
  hideUserModal(value: boolean): void {
    if (value === true) {
      this.userModal.hide();
    }
    this.getUsers();
    this.editMode = false;
  }

  // abrir modal cambiar contraseña.
  changePasswordClick(event: any, id: string): void {
    event.preventDefault();
    this.currentUserId = id;
    this.passwordChangeModal.show();
  }

  // cerrar modal cambiar contraseña.
  hidePasswordModal(value: boolean): void {
    if (value === true) {
      this.passwordChangeModal.hide();
      Swal.fire('La Contraseña ha sido cambiada!').then(() => {
        console.info('La Contraseña ha sido cambiada!');
      });
    }
  }

  // borrar usuario.
  async deleteUser(id: string) {
    Sweetalert2.deleteConfirm().then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.getUsers();
          Sweetalert2.deleteSuccess();
        });
      }
    });
  }

}
