import {NgModule} from '@html/core';
import {CommonModule} from '@html/common';
import {FormsModule} from '@html/forms';
import {DevicesRoutingModule} from './devices-routing.module';
import {GlobalModule} from '../global/global.module';
import {AuthService} from 'src/app/user/services/auth.service';
import {DeviceListService, DeviceTramoService, DeviceService} from './services';
import {TowerService, TramoService, CoverageService} from '../system/services';
import {DevicesListComponent} from './pages/devices-list/devices-list.component';
import {DeviceTramoComponent} from './components/device-tramo/device-tramo.component';
import {DeviceTableComponent} from './components/device-table/device-table.component';
import {DeviceModalComponent} from './components/device-modal/device-modal.component';

@NgModule({
  declarations: [
    DevicesListComponent,
    DeviceTramoComponent,
    DeviceTableComponent,
    DeviceModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DevicesRoutingModule,
    GlobalModule
  ],
  providers: [
    DeviceListService,
    DeviceTramoService,
    TowerService,
    TramoService,
    CoverageService,
    DeviceService,
    AuthService
  ]
})
export class DevicesModule {
}
