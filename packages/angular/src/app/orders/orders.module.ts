import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {GlobalModule} from '../global/global.module';
import {InstallationOrdersComponent} from './pages/installation-orders/installation-orders.component';


@NgModule({
  declarations: [
    InstallationOrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    GlobalModule
  ]
})
export class OrdersModule {
}
