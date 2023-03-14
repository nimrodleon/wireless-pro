import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {OrdersRoutingModule} from './orders-routing.module';
import {GlobalModule} from '../global/global.module';
import {ClientModule} from '../client/client.module';
import {WorkOrderService, WorkOrderDetailService, OrderMaterialService} from './services';
import {ServicePlanService} from '../system/services';
import {ClientService} from '../client/services';
import {UserService} from '../user/services';
import {WorkOrdersComponent} from './pages/work-orders/work-orders.component';
import {WorkFormComponent} from './pages/work-form/work-form.component';
import {WorkDetailComponent} from './pages/work-detail/work-detail.component';
import {ItemMaterialComponent} from './components/item-material/item-material.component';
import {WorkReportComponent} from './pages/work-report/work-report.component';
import {AddMaterialComponent} from './components/add-material/add-material.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {WorkTicketComponent} from './pages/work-ticket/work-ticket.component';

@NgModule({
  declarations: [
    WorkOrdersComponent,
    WorkFormComponent,
    WorkDetailComponent,
    ItemMaterialComponent,
    WorkReportComponent,
    AddMaterialComponent,
    AddUserComponent,
    WorkTicketComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    GlobalModule,
    ClientModule
  ],
  providers: [
    WorkOrderService,
    WorkOrderDetailService,
    OrderMaterialService,
    ServicePlanService,
    ClientService,
    UserService
  ]
})
export class OrdersModule {
}
