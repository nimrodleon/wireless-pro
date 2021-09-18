import {Component, OnInit} from '@angular/core';
import {DeviceListService} from '../../services';

@Component({
  selector: 'app-device-tramo',
  templateUrl: './device-tramo.component.html',
  styleUrls: ['./device-tramo.component.scss']
})
export class DeviceTramoComponent implements OnInit {

  constructor(
    private deviceListService: DeviceListService) {
  }

  ngOnInit(): void {
  }

  get coverages() {
    return this.deviceListService.coverages;
  }

  get currentTramoId() {
    return this.deviceListService.currentTramoId;
  }

  tramoItemClick(event: any): void {
    const target = event.target;
    const oldTramoItem = document.getElementById(this.currentTramoId);
    // item tramo anterior.
    if (oldTramoItem) {
      oldTramoItem.classList.remove('font-weight-bold', 'text-success');
    }
    this.deviceListService.setCurrentTramoId(target.id);
    target.classList.add('font-weight-bold', 'text-success');
    // cargar equipos en la tabla.
    this.deviceListService.getDevicesByTramo(this.currentTramoId);
  }

}
