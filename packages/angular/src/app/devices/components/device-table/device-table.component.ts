import {Component, OnInit} from '@angular/core';
import * as ClipboardJS from 'clipboard';
import {DeviceListService} from '../../services';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit {

  constructor(private deviceListService: DeviceListService) {
  }

  ngOnInit(): void {
    new ClipboardJS('[data-clipboard-text]');
  }

  get devices() {
    return this.deviceListService.devices;
  }

  editDevice(id: string): void {
  }

  deleteDevice(id: string): void {
  }

}
