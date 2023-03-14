import {Component, OnInit} from '@html/core';

declare var jQuery: any;
import * as ClipboardJS from 'clipboard';
import {DeviceListService} from '../../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit {

  constructor(
    private deviceListService: DeviceListService) {
  }

  ngOnInit(): void {
    new ClipboardJS('[data-clipboard-text]');
  }

  // Lista de roles.
  get roles() {
    return this.deviceListService.roles;
  }

  // rol actual del usuario autentificado.
  get currentRole() {
    return this.deviceListService.currentRole;
  }

  get devices() {
    return this.deviceListService.devices;
  }

  editDevice(id: string): void {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      Swal.fire(
        'Información',
        'No tiene permisos para realizar esta tarea!',
        'error'
      );
    } else {
      this.deviceListService.titleModal = 'Editar Equipo';
      this.deviceListService.getDevice(id);
      jQuery('#app-device-modal').modal('show');
    }
  }

  deleteDevice(id: string): void {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
        'error'
      );
    } else {
      // Borrar si el usuario tiene permisos.
      Swal.fire({
        title: '¿Estás seguro de borrar?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deviceListService.deleteDevice(id);
        }
      });
    }
  }

}
