import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientDetailComponent} from './pages/client-detail/client-detail.component';
import {ClientListComponent} from './pages/client-list/client-list.component';
import {ServiceDetailComponent} from './pages/service-detail/service-detail.component';
import {TicketComponent} from './pages/ticket/ticket.component';
import {ReceivableComponent} from './pages/receivable/receivable.component';
import {PaymentDailyComponent} from './pages/payment-daily/payment-daily.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: ClientListComponent},
      {path: 'detail/:id', component: ClientDetailComponent},
      {path: 'service-detail/:id', component: ServiceDetailComponent},
      {path: 'ticket/:id', component: TicketComponent},
      {path: 'receivable', component: ReceivableComponent},
      {path: 'payment-daily', component: PaymentDailyComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
