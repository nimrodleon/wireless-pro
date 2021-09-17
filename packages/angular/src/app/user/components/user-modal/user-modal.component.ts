import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../interfaces';
import {UserService} from '../../services';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  currentUser: User;
  @Input()
  editMode: boolean = false;
  @Output()
  hideModal = new EventEmitter<boolean>();
  // ============================================================
  userForm: FormGroup = this.userService.formGroup();
  errors: any = [];

  constructor(
    private userService: UserService) {
    this.currentUser = this.userService.defaultValues();
  }

  ngOnInit(): void {
    this.userForm.valueChanges
      .subscribe(value => this.currentUser = value);
    // eventos del modal.
    let myModal: any = document.querySelector('#app-user-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      this.userForm.reset(this.currentUser);
      if (this.editMode === true) {
        // @ts-ignore
        delete this.currentUser.password;
        this.userForm.controls['password'].disable();
      }
    });
    myModal.addEventListener('hide.bs.modal', () => {
      this.hideModal.emit(false);
      this.userForm.controls['password'].enable();
      this.userForm.reset(this.userService.defaultValues());
      this.errors = [];
    });
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.userForm.controls[field].errors
      && this.userForm.controls[field].touched;
  }

  // Guardar datos.
  saveChanges(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    // Guardar datos, sólo si es válido el formulario.
    if (this.currentUser._id === null) {
      // registrar usuario.
      // @ts-ignore
      delete this.currentUser._id;
      this.userService.createUser(this.currentUser)
        .subscribe(() => {
          this.hideModal.emit(true);
        }, ({error}) => {
          this.errors = error.errors;
        });
    } else {
      // actualizar usuario.
      this.userService.updateUser(this.currentUser).subscribe(() => {
        this.hideModal.emit(true);
      }, ({error}) => {
        this.errors = error.errors;
      });
    }
  }


}
