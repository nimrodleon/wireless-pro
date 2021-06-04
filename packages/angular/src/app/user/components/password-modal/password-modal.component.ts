import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent implements OnInit {
  @Input()
  isProfile: boolean = true;
  password: any = {};
  @Output()
  sendPassword = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    jQuery('#app-password-modal').on('shown.bs.modal', () => {
      this.password = {};
    });
  }

  saveChanges(): void {
    this.password.isProfile = this.isProfile;
    const { current, old } = this.password;
    // FILTRAR CONTRASEÑA.
    if (!this.isProfile) {
      if (!current) {
        Swal.fire('Ingrese datos requeridos!');
      } else {
        this.sendPassword.emit(this.password);
        jQuery('#app-password-modal').modal('hide');
      }
    } else {
      if (current && old) {
        this.sendPassword.emit(this.password);
        jQuery('#app-password-modal').modal('hide');
      } else {
        Swal.fire('Ingrese datos requeridos!');
      }
    }
  }

}
