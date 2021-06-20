import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InstallationOrdersComponent} from './pages/installation-orders/installation-orders.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: InstallationOrdersComponent},
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
