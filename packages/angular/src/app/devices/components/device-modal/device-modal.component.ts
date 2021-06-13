import {Component, OnInit, Input} from '@angular/core';

declare var jQuery: any;
import {Device} from '../../interfaces';
import {DeviceListService} from '../../services';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit {
  @Input()
  title: string;
  device: Device;
  // baseURL para select2.
  baseURL: string = environment.baseUrl + 'devices';

  constructor(
    private deviceListService: DeviceListService) {
    this.device = this.currentDevice;
  }

  ngOnInit(): void {
    // Cargar Cada Vez se carga el Modal.
    jQuery('#app-device-modal').on('shown.bs.modal', () => {
      this.device = this.currentDevice;
      this.deviceListService.loadValuesDeviceModal();
      // Configuraciones Select2.
      jQuery('select[name="accessPoint"]').select2({
        theme: 'bootstrap4',
        dropdownParent: jQuery('#app-device-modal'),
        ajax: {
          url: this.baseURL + '/v1/select2/s',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      });
      // Preselecting options in an remotely-sourced.
      jQuery('select[name="accessPoint').val(null).trigger('change');
      if (this.device._id) {
        if (this.device.accessPoint) {
          // this.deviceService.getDevice(this.device.accessPoint).subscribe(res => {
          //   const option = new Option(res.name + ' - ' + res.ipAddress, res._id, true, true);
          //   jQuery('select[name="accessPoint').append(option).trigger('change');
          // });
        }
      }
    });
  }

  // Dispositivo actual.
  get currentDevice() {
    return this.deviceListService.currentDevice;
  }

  // Lista de areas cobertura.
  get coverages() {
    return this.deviceListService.coveragesList;
  }

  // Lista de tramos.
  get tramos() {
    return this.deviceListService.tramosList;
  }

  // Lista de torres.
  get towers() {
    return this.deviceListService.towersList;
  }

  // retorna true si el modo dispositivo es distinto a punto  de acceso.
  checkApMode(): boolean {
    return this.device.mode !== 'P';
  }

  saveChanges(): void {
    // this.device.accessPoint = jQuery('select[name="accessPoint"]').val();
    // this.sendModel.emit(this.device);
    // jQuery('#app-device-modal').modal('hide');
  }

}
