import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {User} from '../user.model';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

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
  status: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService, private router: Router) {
    this.users = new Array<User>();
    this.currentUser = new User();
  }

  ngOnInit(): void {
    jQuery(() => {
      jQuery('[data-toggle="tooltip"]').tooltip();
    });
    this.getUsers();
    this.authService.isAdmin().subscribe(res => {
      if (res != true) {
        this.router.navigate(['/']);
      }
    });
  }

  // Users List.
  private getUsers(): void {
    this.userService.getUsers(this.status)
      .subscribe(res => this.users = res);
  }

  // Change status value.
  onChangeStatus(checked: boolean): void {
    this.status = checked;
    this.getUsers();
  }

  // New User.
  addUser(): void {
    this.editMode = false;
    this.titleModal = 'Agregar Usuario';
    this.currentUser = new User();
    jQuery('#app-user-modal').modal('show');
  }

  // User Edit.
  editUser(id: string): void {
    this.titleModal = 'Editar Usuario';
    this.userService.getUser(id).subscribe(res => {
      this.editMode = true;
      this.currentUser = res;
      jQuery('#app-user-modal').modal('show');
    });
  }

  // Save User Values.
  saveChanges(user: User): void {
    if (user._id === undefined) {
      this.userService.create(user).subscribe(res => this.getUsers());
    } else {
      this.userService.update(user).subscribe(res => this.getUsers());
    }
    this.editMode = false;
  }

  // Open Modal Change Password.
  onChangePassword(event, id: string): void {
    event.preventDefault();
    this.userService.getUser(id).subscribe(res => {
      this.currentUser = res;
      jQuery('#app-password-modal').modal('show');
    });
  }

  // Save Password.
  savePassword(passwd: any): void {
    if (passwd.current) {
      console.log(passwd.current.length);
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
        this.userService.dependency(id).subscribe(res => {
          if (res > 0) {
            Swal.fire(
              'No se pudo borrar?',
              'Existe documentos asociado a este registro?',
              'warning'
            );
          } else {
            this.userService.delete(id).subscribe(res => {
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
    });
  }

}
