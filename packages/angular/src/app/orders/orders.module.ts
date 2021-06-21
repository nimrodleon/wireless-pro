import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {GlobalModule} from '../global/global.module';
import {InstallationOrderService} from './services';
import {InstallationOrdersComponent} from './pages/installation-orders/installation-orders.component';
import {InstallationFormComponent} from './pages/installation-form/installation-form.component';
import {InstallationDetailComponent} from './pages/installation-detail/installation-detail.component';
import {ItemMaterialComponent} from './components/item-material/item-material.component';

@NgModule({
  declarations: [
    InstallationOrdersComponent,
    InstallationFormComponent,
    InstallationDetailComponent,
    ItemMaterialComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    GlobalModule
  ],
  providers: [
    InstallationOrderService
  ]
})
export class OrdersModule {
}
