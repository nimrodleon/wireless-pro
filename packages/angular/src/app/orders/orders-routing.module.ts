import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InstallationOrdersComponent} from './pages/installation-orders/installation-orders.component';
import {InstallationFormComponent} from './pages/installation-form/installation-form.component';
import {InstallationDetailComponent} from './pages/installation-detail/installation-detail.component';
import {InstallationReportComponent} from './pages/installation-report/installation-report.component';
import {InstallationTicketComponent} from './pages/installation-ticket/installation-ticket.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: InstallationOrdersComponent},
      {path: 'new', component: InstallationFormComponent},
      {path: 'edit/:id', component: InstallationFormComponent},
      {path: 'detail/:id', component: InstallationDetailComponent},
      {path: 'ticket/:id', component: InstallationTicketComponent},
      {path: 'report', component: InstallationReportComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
