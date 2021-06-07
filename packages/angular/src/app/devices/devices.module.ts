import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevicesListComponent} from './pages/devices-list/devices-list.component';
import {GlobalModule} from '../global/global.module';
import {FormsModule} from '@angular/forms';
import {TowerService} from '../system/services/tower.service';
import {TramoService} from '../system/services/tramo.service';
import {DeviceService} from './services/device.service';
import {DeviceTramoComponent} from './components/device-tramo/device-tramo.component';
import {DeviceTableComponent} from './components/device-table/device-table.component';
import {DeviceModalComponent} from './components/device-modal/device-modal.component';
import {DeviceTowerComponent} from './components/device-tower/device-tower.component';
import {CoverageService} from '../system/services/coverage.service';
import {AuthService} from '../user/services/auth.service';


@NgModule({
  declarations: [
    DevicesListComponent,
    DeviceTramoComponent,
    DeviceTableComponent,
    DeviceModalComponent,
    DeviceTowerComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule
  ],
  exports: [
    DevicesListComponent
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
