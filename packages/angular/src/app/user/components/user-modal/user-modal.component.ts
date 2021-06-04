import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var jQuery: any;
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  user: User;
  @Input()
  editMode: boolean;
  @Output()
  sendModel = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  // Permisos de Administrador.
  onIsAdmin(checked: boolean): void {
    this.user.isAdmin = checked;
  }

  // Permisos para el administrador de redes.
  onIsRedes(checked: boolean): void {
    this.user.redes = checked;
  }

  // Permisos para cobrar en caja.
  onIsCaja(checked: boolean): void {
    this.user.caja = checked;
  }

  // Suspender usuarios.
  onSuspended(checked: boolean): void {
    this.user.suspended = checked;
  }

  // Guardar datos.
  saveChanges(): void {
    this.sendModel.emit(this.user);
    jQuery('#app-user-modal').modal('hide');
  }

}
