import {Component, OnInit} from '@angular/core';
import {Device} from '../../interfaces';
import {DeviceListService, DeviceService} from '../../services';
import {environment} from 'src/environments/environment';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html'
})
export class DeviceModalComponent implements OnInit {
  // title: string;
  device: Device;
  // baseURL para select2.
  baseURL: string = environment.baseUrl + 'devices';

  constructor(
    private deviceListService: DeviceListService,
    private deviceService: DeviceService) {
    this.device = this.currentDevice;
  }

  ngOnInit(): void {
    // Cargar Cada Vez se carga el Modal.
    jQuery('#app-device-modal').on('shown.bs.modal', () => {
      // this.title = this.deviceListService.titleModal;
      this.device = this.currentDevice;
      this.deviceListService.loadValuesDeviceModal();
      // Configuraciones Select2.
      jQuery('select[name="accessPoint"]').select2({
        theme: 'bootstrap-5',
        dropdownParent: jQuery('#app-device-modal'),
        ajax: {
          url: this.baseURL + '/v1/select2/s',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      }).val(null).trigger('change');
      // Preselecting options in an remotely-sourced.
      // jQuery('select[name="accessPoint').val(null).trigger('change');
      if (this.device._id !== '') {
        if (this.device.accessPoint) {
          this.deviceService.getDevice(this.device.accessPoint).subscribe(res => {
            const option = new Option(res.name + ' - ' + res.ipAddress, res._id, true, true);
            jQuery('select[name="accessPoint').append(option).trigger('change');
          });
        }
      }
    });
  }

  // título del modal.
  get title() {
    return this.deviceListService.titleModal;
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
    if (this.checkApMode()) {
      this.device.accessPoint = jQuery('select[name="accessPoint"]').val();
    }
    if (this.device.coverage === '' || this.device.tramo === '') {
      Swal.fire('Seleccione Area cobertura y Tramo!');
    } else {
      // console.info(this.device);
      if (this.device._id === '') {
        // registrar información del equipo.
        this.deviceListService.addDevice(this.device);
      } else {
        // actualizar información del equipo.
        this.deviceListService.updateDevice(this.device);
      }
      jQuery('#app-device-modal').modal('hide');
    }
  }

}
