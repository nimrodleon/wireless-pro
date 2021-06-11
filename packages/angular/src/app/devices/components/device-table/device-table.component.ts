import {Component, OnInit} from '@angular/core';
import {DeviceListService} from '../../services/device-list.service';
import * as ClipboardJS from 'clipboard';

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
