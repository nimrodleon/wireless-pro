import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevicesListComponent} from './devices-list/devices-list.component';
import {TowerListComponent} from './tower-list/tower-list.component';
import {GlobalModule} from '../global/global.module';
import {FormsModule} from '@angular/forms';
import {TowerModalComponent} from './tower-modal/tower-modal.component';
import {TowerService} from './tower.service';
import {TramoService} from './tramo.service';
import {DeviceService} from './device.service';
import {DeviceTramoComponent} from './device-tramo/device-tramo.component';
import {DeviceTableComponent} from './device-table/device-table.component';
import {DeviceModalComponent} from './device-modal/device-modal.component';
import {TramoListComponent} from './tramo-list/tramo-list.component';
import {TramoModalComponent} from './tramo-modal/tramo-modal.component';
import {DeviceTowerComponent} from './device-tower/device-tower.component';
import {CoverageService} from '../client/coverage.service';
import {AuthService} from '../user/services/auth.service';


@NgModule({
  declarations: [
    DevicesListComponent,
    TowerListComponent,
    TowerModalComponent,
    DeviceTramoComponent,
    DeviceTableComponent,
    DeviceModalComponent,
    TramoListComponent,
    TramoModalComponent,
    DeviceTowerComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule
  ],
  exports: [
    DevicesListComponent,
    TowerListComponent,
    TramoListComponent
  ],
  providers: [
    TowerService,
    TramoService,
    CoverageService,
    DeviceService,
    AuthService
  ]
})
export class DevicesModule {
}
