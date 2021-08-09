import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../interfaces';

@Component({
  selector: 'app-client-form-modal',
  templateUrl: './client-form-modal.component.html',
  styleUrls: ['./client-form-modal.component.scss']
})
export class ClientFormModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  currentClient: Client;
  @Output()
  hideModal = new EventEmitter<Client>();

  clientForm: FormGroup = this.fb.group({
    _id: [null],
    dni: ['', [Validators.required]],
    type: ['PERSONA', [Validators.required]],
    fullName: ['', [Validators.required]],
    fullAddress: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.email]],
    note: ['']
  });

  constructor(
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let myModal = document.querySelector('#client-form-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      this.clientForm.reset({...this.currentClient});
    });
    this.clientForm.valueChanges
      .subscribe(value => this.currentClient = value);
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.clientForm.controls[field].errors
      && this.clientForm.controls[field].touched;
  }

  // Envía los datos de cliente,
  // para guardar en la base de datos.
  saveChanges(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    // Guardar datos, sólo si es válido el formulario.
    this.hideModal.emit(this.currentClient);
  }

}
