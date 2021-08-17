import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkOrdersComponent} from './pages/work-orders/work-orders.component';
import {WorkFormComponent} from './pages/work-form/work-form.component';
import {WorkDetailComponent} from './pages/work-detail/work-detail.component';
import {WorkReportComponent} from './pages/work-report/work-report.component';
import {WorkTicketComponent} from './pages/work-ticket/work-ticket.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: WorkOrdersComponent},
      {path: 'new', component: WorkFormComponent},
      {path: 'edit/:id', component: WorkFormComponent},
      {path: 'detail/:id', component: WorkDetailComponent},
      {path: 'ticket/:id', component: WorkTicketComponent},
      {path: 'report', component: WorkReportComponent},
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
