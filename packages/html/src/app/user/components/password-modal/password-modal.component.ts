import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UserService} from '../../services';

interface PasswordModel {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html'
})
export class PasswordModalComponent implements OnInit {
  @Input()
  currentUserId: string = '';
  @Output()
  hideModal = new EventEmitter<boolean>();
  // ============================================================
  passwordModel: PasswordModel;
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    // @ts-ignore
    let pass = group.get('password').value;
    // @ts-ignore
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  };
  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {validators: this.checkPasswords});

  constructor(
    private fb: FormBuilder,
    private userService: UserService) {
    this.passwordModel = {
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit(): void {
    this.passwordForm.valueChanges
      .subscribe(value => this.passwordModel = value);
    let myModal: any = document.querySelector('#app-password-modal');
    myModal.addEventListener('shown.bs.modal', () => {

    });
    myModal.addEventListener('hide.bs.modal', () => {
      this.passwordModel = {
        password: '',
        confirmPassword: ''
      };
      this.passwordForm.reset(this.passwordModel);
    });
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.passwordForm.controls[field].errors
      && this.passwordForm.controls[field].touched;
  }

  // cambiar contraseña.
  saveChanges(): void {
    if (this.passwordForm.invalid) {
      if (this.passwordForm.hasError('notSame')) {
        Swal.fire('Las contraseñas no coinciden.').then(() => {
          console.log('Las contraseñas no coinciden.');
        });
      }
      this.passwordForm.markAllAsTouched();
      return;
    }
    // Guardar datos, sólo si es válido el formulario.
    // @ts-ignore
    delete this.passwordModel.confirmPassword;
    this.userService.changePasswordUser(this.currentUserId, this.passwordModel)
      .subscribe(() => {
        this.hideModal.emit(true);
      });
  }

}
