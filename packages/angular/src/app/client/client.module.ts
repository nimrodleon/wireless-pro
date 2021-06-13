import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClientRoutingModule} from './client-routing.module';
import {GlobalModule} from '../global/global.module';
import {ClientService, PaymentService, OutagesService, ServiceService} from './services';
import {CoverageService, ServicePlanService} from '../system/services';
import {DeviceService} from '../devices/services';
import {ClientListComponent} from './pages/client-list/client-list.component';
import {ClientDetailComponent} from './pages/client-detail/client-detail.component';
import {ClientFormModalComponent} from './components/client-form-modal/client-form-modal.component';
import {CardExpectedPaymentComponent} from './components/card-expected-payment/card-expected-payment.component';
import {CardClientServiceComponent} from './components/card-client-service/card-client-service.component';
import {CardClientDetailComponent} from './components/card-client-detail/card-client-detail.component';
import {AddClientServiceComponent} from './components/add-client-service/add-client-service.component';
import {PaymentListComponent} from './pages/payment-list/payment-list.component';
import {PaymentModalComponent} from './components/payment-modal/payment-modal.component';
import {ServiceDetailComponent} from './pages/service-detail/service-detail.component';
import {CardOutagesComponent} from './components/card-outages/card-outages.component';
import {TicketComponent} from './pages/ticket/ticket.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientDetailComponent,
    ClientFormModalComponent,
    CardExpectedPaymentComponent,
    CardClientServiceComponent,
    CardClientDetailComponent,
    AddClientServiceComponent,
    PaymentListComponent,
    PaymentModalComponent,
    ServiceDetailComponent,
    CardOutagesComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    GlobalModule
  ],
  providers: [
    ClientService,
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
