import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SystemListComponent} from './pages/system-list/system-list.component';
import {GeneralComponent} from './pages/general/general.component';
import {ServicePlanComponent} from './pages/service-plan/service-plan.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: SystemListComponent},
      {path: 'general', component: GeneralComponent},
      {path: 'service-plans', component: ServicePlanComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
