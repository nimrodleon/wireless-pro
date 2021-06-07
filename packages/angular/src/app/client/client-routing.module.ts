import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientDetailComponent} from './pages/client-detail/client-detail.component';
import {ClientListComponent} from './pages/client-list/client-list.component';
import {PaymentListComponent} from './pages/payment-list/payment-list.component';
import {ServiceDetailComponent} from './pages/service-detail/service-detail.component';
import {TicketComponent} from './pages/ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: ClientListComponent},
      {path: 'detail/:id', component: ClientDetailComponent},
      {path: 'payments/:id', component: PaymentListComponent},
      {path: 'service-detail/:id', component: ServiceDetailComponent},
      {path: 'ticket/:id', component: TicketComponent},
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
