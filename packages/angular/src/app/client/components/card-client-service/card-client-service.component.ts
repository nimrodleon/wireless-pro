import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as ClipboardJS from 'clipboard';
import Swal from 'sweetalert2';
import {DeviceService} from 'src/app/devices/services';
import {Service} from '../../interfaces';

@Component({
  selector: 'app-card-client-service',
  templateUrl: './card-client-service.component.html',
  styleUrls: ['./card-client-service.component.scss']
})
export class CardClientServiceComponent implements OnInit {
  @Input()
  currentService: Service;
  @Output()
  sendIdService = new EventEmitter<string>();

  constructor(
    private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    new ClipboardJS('[data-clipboard-text]');
  }

  // retornar estado del servicio.
  getStatusText(value: string): string {
    switch (value) {
      case 'H':
        return 'HABILITADO';
      case 'D':
        return 'DESHABILITADO';
      case 'N':
        return 'NOTIFICADO';
      case 'S':
        return 'SUSPENDIDO';
    }
  }

  // editar servicio.
  editServiceClick(): void {
    this.sendIdService.emit(this.currentService._id);
  }

  // cargar información del punto de acceso.
  async cargarApInfo(event: any) {
    event.preventDefault();
    this.deviceService.getDevice(this.currentService.accessPoint)
      .subscribe(result => {
        Swal.fire({
          title: '<strong>PUNTO DE ACCESO</strong>',
          html: `
          <p class="pb-2">
            <span><i class="fas fa-network-wired"></i> Ip Address: </span>
            <a href="https://${result.ipAddress}" target="_blank">${result.ipAddress}</a>
          </p>
          <table class="table mb-0">
            <tr class="bg-warning">
              <th><i class="fas fa-user"></i> User</th>
              <td>
                <div class="d-flex justify-content-between">
                    ${result.userName}
                </div>
              </td>
              <th><i class="fas fa-unlock-alt"></i> Password</th>
              <td>
                <div class="d-flex justify-content-between">
                    ${result.password}
                </div>
              </td>
            </tr>
          </table>
          `
        });
      });
  }

}
