import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as ClipboardJS from 'clipboard';
import Swal from 'sweetalert2';
import {DeviceService} from 'src/app/devices/services';
import {Service} from '../../interfaces';
import {ServiceService} from '../../services';

@Component({
  selector: 'app-card-client-service',
  templateUrl: './card-client-service.component.html'
})
export class CardClientServiceComponent implements OnInit {
  @Input()
  currentService: Service;
  @Output()
  sendIdService = new EventEmitter<string>();

  constructor(
    private serviceService: ServiceService,
    private deviceService: DeviceService) {
    this.currentService = this.serviceService.defaultValues();
  }

  ngOnInit(): void {
    new ClipboardJS('[data-clipboard-text]');
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
          <span class="text-uppercase fw-bold pb-1">${result.name.trim()} / ${result.ssid.trim()}</span>
          <p class="pb-2">
            <span><i class="fas fa-network-wired"></i> Ip Address: </span>
            <a href="https://${result.ipAddress}" class="fw-bold" target="_blank">${result.ipAddress}</a>
          </p>
          <table class="table mb-0">
            <tr class="table-secondary">
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
      }, () => {
        Swal.fire(
          'Oops...',
          'No existe una AP relacionada a este equipo!',
          'error'
        );
      });
  }

}
