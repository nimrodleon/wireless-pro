import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
import {Device} from '../../interfaces/device';
import {Tramo} from '../../../system/interfaces/tramo';
import {TramoService} from '../../../system/services/tramo.service';
import {Tower} from '../../../system/interfaces/tower';
import {TowerService} from '../../../system/services/tower.service';
import {DeviceService} from '../../services/device.service';
import {environment} from 'src/environments/environment';
import {Coverage} from 'src/app/system/interfaces/coverage';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.scss']
})
export class DeviceModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  coverages: Array<Coverage>;
  @Input()
  device: Device;
  // Output data.
  @Output()
  sendModel = new EventEmitter<Device>();
  // Variables Locales.
  tramos: Array<Tramo>;
  towers: Array<Tower>;
  // baseURL para select2.
  baseURL: string = environment.baseUrl + 'devices';

  constructor(private tramoService: TramoService,
              private towerService: TowerService, private deviceService: DeviceService) {
    this.tramos = new Array<Tramo>();
    this.towers = new Array<Tower>();
  }

  ngOnInit(): void {
    jQuery('#app-device-modal').on('shown.bs.modal', () => {
      jQuery('select[name="accessPoint"]').select2({
        theme: 'bootstrap4',
        minimumInputLength: 4,
        ajax: {
          url: this.baseURL + '/v1/select2/s'
        }
      });
      // Preselecting options in an remotely-sourced.
      jQuery('select[name="accessPoint').val(null).trigger('change');
      if (this.device._id) {
        if (this.device.accessPoint) {
          this.deviceService.getDevice(this.device.accessPoint).subscribe(res => {
            const option = new Option(res.name + ' - ' + res.ipAddress, res._id, true, true);
            jQuery('select[name="accessPoint').append(option).trigger('change');
          });
        }
      }
      this.tramoService.getTramosV1().subscribe(res => this.tramos = res);
      this.towerService.getTowersV1().subscribe(res => this.towers = res);
    });
  }

  saveChanges(): void {
    this.device.accessPoint = jQuery('select[name="accessPoint"]').val();
    this.sendModel.emit(this.device);
    jQuery('#app-device-modal').modal('hide');
  }

}
