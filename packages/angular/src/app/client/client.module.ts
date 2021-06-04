import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ClientRoutingModule} from './client-routing.module';
import {GlobalModule} from '../global/global.module';
import {ClientService} from './client.service';
import {CoverageService} from './coverage.service';
import {PaymentService} from './payment.service';
import {ServicePlanService} from './service-plan.service';
import {ServiceService} from './service.service';
import {ClientListComponent} from './client-list/client-list.component';
import {ClientDetailComponent} from './client-detail/client-detail.component';
import {ClientFormModalComponent} from './client-form-modal/client-form-modal.component';
import {CardExpectedPaymentComponent} from './card-expected-payment/card-expected-payment.component';
import {CardClientServiceComponent} from './card-client-service/card-client-service.component';
import {CardClientDetailComponent} from './card-client-detail/card-client-detail.component';
import {AddClientServiceComponent} from './add-client-service/add-client-service.component';
import {ClientOutletComponent} from './client-outlet/client-outlet.component';
import {CoverageListComponent} from './coverage-list/coverage-list.component';
import {CoverageModalComponent} from './coverage-modal/coverage-modal.component';
import {ServicePlanComponent} from './service-plan/service-plan.component';
import {ServicePlanModalComponent} from './service-plan-modal/service-plan-modal.component';
import {PaymentListComponent} from './payment-list/payment-list.component';
import {PaymentModalComponent} from './payment-modal/payment-modal.component';
import {ServiceDetailComponent} from './service-detail/service-detail.component';
import {DeviceService} from '../devices/device.service';
import {CardOutagesComponent} from './card-outages/card-outages.component';
import {OutagesService} from './outages.service';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientDetailComponent,
    ClientFormModalComponent,
    CardExpectedPaymentComponent,
    CardClientServiceComponent,
    CardClientDetailComponent,
    AddClientServiceComponent,
    ClientOutletComponent,
    CoverageListComponent,
    CoverageModalComponent,
    ServicePlanComponent,
    ServicePlanModalComponent,
    PaymentListComponent,
    PaymentModalComponent,
    ServiceDetailComponent,
    CardOutagesComponent
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
