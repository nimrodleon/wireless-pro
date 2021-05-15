import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../device.model';
import ClipboardJS from 'clipboard';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit {
  @Input() devices: Array<Device>;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    new ClipboardJS('[data-clipboard-text]');
  }

  editDevice(id: string): void {
    this.edit.emit(id);
  }

  deleteDevice(id: string): void {
    this.delete.emit(id);
  }

}
