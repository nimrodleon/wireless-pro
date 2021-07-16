import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientRoutingModule} from './client-routing.module';
import {GlobalModule} from '../global/global.module';
import {AveriaModule} from '../averia/averia.module';
import {
  ClientService,
  PaymentService,
  OutagesService,
  ServiceService,
  ClientDetailService,
  ServiceDetailService
} from './services';
import {CoverageService, ServicePlanService} from '../system/services';
import {DeviceService} from '../devices/services';
import {ClientListComponent} from './pages/client-list/client-list.component';
import {ClientDetailComponent} from './pages/client-detail/client-detail.component';
import {ClientFormModalComponent} from './components/client-form-modal/client-form-modal.component';
import {CardClientServiceComponent} from './components/card-client-service/card-client-service.component';
import {PaymentModalComponent} from './components/payment-modal/payment-modal.component';
import {ServiceDetailComponent} from './pages/service-detail/service-detail.component';
import {CardOutagesComponent} from './components/card-outages/card-outages.component';
import {TicketComponent} from './pages/ticket/ticket.component';
import {ReceivableComponent} from './pages/receivable/receivable.component';
import {PaymentDailyComponent} from './pages/payment-daily/payment-daily.component';
import {ServiceModalComponent} from './components/service-modal/service-modal.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientDetailComponent,
    ClientFormModalComponent,
    CardClientServiceComponent,
    PaymentModalComponent,
    ServiceDetailComponent,
    CardOutagesComponent,
    TicketComponent,
    ReceivableComponent,
    PaymentDailyComponent,
    ServiceModalComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GlobalModule,
    AveriaModule
  ],
  exports: [
    ClientFormModalComponent
  ],
  providers: [
    ClientService,
    ClientDetailService,
    ServiceDetailService,
    CoverageService,
    PaymentService,
    ServicePlanService,
    ServiceService,
    DeviceService,
    OutagesService
  ]
})
export class ClientModule {
}
