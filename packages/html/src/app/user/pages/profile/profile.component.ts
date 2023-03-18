import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {User} from '../../interfaces';
import {UserService} from '../../services';

declare var bootstrap: any;

interface UserModel {
  fullName: string;
  userName: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  userModel: UserModel;
  passwordChangeModal: any;
  userForm: UntypedFormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    userName: ['', [Validators.required]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService) {
    this.currentUser = this.userService.defaultValues();
    this.userModel = {
      fullName: '',
      userName: ''
    };
  }

  ngOnInit(): void {
    this.getUser();
    // Vincular modal del componente.
    this.passwordChangeModal = new bootstrap.Modal(
      document.querySelector('#app-password-modal'));
    // vincular cambios del formulario.
    this.userForm.valueChanges.subscribe(value => this.userModel = value);
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.userForm.controls[field].errors
      && this.userForm.controls[field].touched;
  }

  private getUser(): void {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
      this.userModel.fullName = res.fullName;
      this.userModel.userName = res.userName;
      this.userForm.reset(this.userModel);
    });
  }

  updateUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    // Guardar datos, sólo si es válido el formulario.
    this.currentUser.fullName = this.userModel.fullName;
    this.currentUser.userName = this.userModel.userName;
    this.userService.updateUserProfile(this.currentUser).subscribe(res => {
      this.currentUser = res;
      Swal.fire('Su Información ha sido guardado!').then(() => {
        console.info('Datos guardados!');
      });
    }, ({error}) => {
      Swal.fire(error.errors[0].msg).then(() => {
        console.info('No se pudo actualizar el registro!');
      });
    });
  }

  changePasswordClick(): void {
    this.passwordChangeModal.show();
  }

  // cerrar modal cambiar contraseña.
  hidePasswordModal(value: boolean): void {
    if (value === true) {
      this.passwordChangeModal.hide();
      Swal.fire('Has cambiado tu contraseña!').then(() => {
        console.info('Has cambiado tu contraseña!');
      });
    }
  }

}
