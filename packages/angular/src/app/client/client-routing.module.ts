import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {ClientDetailComponent} from './pages/client-detail/client-detail.component';
import {ClientListComponent} from './pages/client-list/client-list.component';
import {ClientOutletComponent} from './components/client-outlet/client-outlet.component';
import {CoverageListComponent} from './pages/coverage-list/coverage-list.component';
import {PaymentListComponent} from './pages/payment-list/payment-list.component';
import {ServicePlanComponent} from './pages/service-plan/service-plan.component';
import {ServiceDetailComponent} from './pages/service-detail/service-detail.component';

const routes: Routes = [
  {
    path: 'client', component: ClientOutletComponent, children: [
      {path: 'list', component: ClientListComponent},
      {path: 'detail/:id', component: ClientDetailComponent},
      {path: 'coverages', component: CoverageListComponent},
      {path: 'service-plans', component: ServicePlanComponent},
      {path: 'payments/:id', component: PaymentListComponent},
      {path: 'service-detail/:id', component: ServiceDetailComponent}
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
