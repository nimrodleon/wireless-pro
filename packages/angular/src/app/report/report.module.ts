import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalModule} from '../global/global.module';
import {FormsModule} from '@angular/forms';

import {ReportRoutingModule} from './report-routing.module';
import {ActiveClientsComponent} from './active-clients/active-clients.component';
import {DailyInstallationComponent} from './daily-installation/daily-installation.component';
import {DisconnectedClientsComponent} from './disconnected-clients/disconnected-clients.component';
import {DisconnectedServicesComponent} from './disconnected-services/disconnected-services.component';
import {NumberOfDevicesComponent} from './number-of-devices/number-of-devices.component';
import {PaymentJournalComponent} from './payment-journal/payment-journal.component';
import {ReceivableComponent} from './receivable/receivable.component';
import {ServicesWithoutPaymentComponent} from './services-without-payment/services-without-payment.component';
import {ReportListComponent} from './report-list/report-list.component';
import {ReportBaseComponent} from './report-base/report-base.component';
import {ReportService} from './report.service';
import {TotalClientsComponent} from './total-clients/total-clients.component';
import {CoverageService} from '../client/services/coverage.service';
import {ServicePlanService} from '../system/services/service-plan.service';


@NgModule({
  declarations: [
    ActiveClientsComponent,
    DailyInstallationComponent,
    DisconnectedClientsComponent,
    DisconnectedServicesComponent,
    NumberOfDevicesComponent,
    PaymentJournalComponent,
    ReceivableComponent,
    ServicesWithoutPaymentComponent,
    ReportListComponent,
    ReportBaseComponent,
    TotalClientsComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    GlobalModule,
    FormsModule
  ],
  providers: [
    ReportService,
    CoverageService,
    ServicePlanService
  ],
  bootstrap: [ReportBaseComponent]
})
export class ReportModule {
}
