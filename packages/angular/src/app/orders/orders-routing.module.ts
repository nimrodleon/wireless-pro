import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InstallationOrdersComponent} from './pages/installation-orders/installation-orders.component';
import {InstallationFormComponent} from './pages/installation-form/installation-form.component';
import {InstallationDetailComponent} from './pages/installation-detail/installation-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: InstallationOrdersComponent},
      {path: 'new', component: InstallationFormComponent},
      {path: 'detail/:id', component: InstallationDetailComponent},
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
