import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {ActiveClientsComponent} from './active-clients/active-clients.component';
import {DailyInstallationComponent} from './daily-installation/daily-installation.component';
import {DisconnectedClientsComponent} from './disconnected-clients/disconnected-clients.component';
import {DisconnectedServicesComponent} from './disconnected-services/disconnected-services.component';
import {NumberOfDevicesComponent} from './number-of-devices/number-of-devices.component';
import {PaymentJournalComponent} from './payment-journal/payment-journal.component';
import {ReceivableComponent} from './receivable/receivable.component';
import {ReportBaseComponent} from './report-base/report-base.component';
import {ReportListComponent} from './report-list/report-list.component';
import {ServicesWithoutPaymentComponent} from './services-without-payment/services-without-payment.component';
import {TotalClientsComponent} from './total-clients/total-clients.component';

const routes: Routes = [
  {
    path: 'report', component: ReportBaseComponent, children: [
      {path: 'all', component: ReportListComponent},
      {path: 'active-clients', component: ActiveClientsComponent},
      {path: 'daily-installation', component: DailyInstallationComponent},
      {path: 'disconnected-clients', component: DisconnectedClientsComponent},
      {path: 'disconnected-services', component: DisconnectedServicesComponent},
      {path: 'number-of-devices', component: NumberOfDevicesComponent},
      {path: 'payment-journal', component: PaymentJournalComponent},
      {path: 'receivable', component: ReceivableComponent},
      {path: 'services-without-payment', component: ServicesWithoutPaymentComponent},
      {path: 'total-clients', component: TotalClientsComponent}
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
