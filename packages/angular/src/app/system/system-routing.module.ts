import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SystemListComponent} from './pages/system-list/system-list.component';
import {GeneralComponent} from './pages/general/general.component';
import {ServicePlanComponent} from './pages/service-plan/service-plan.component';
import {CoverageListComponent} from './pages/coverage-list/coverage-list.component';
import {MaterialComponent} from './pages/material/material.component';
import {TowerListComponent} from './pages/tower-list/tower-list.component';
import {TramoListComponent} from './pages/tramo-list/tramo-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: SystemListComponent},
      {path: 'general', component: GeneralComponent},
      {path: 'service-plans', component: ServicePlanComponent},
      {path: 'coverages', component: CoverageListComponent},
      {path: 'material', component: MaterialComponent},
      {path: 'tower', component: TowerListComponent},
      {path: 'tramo', component: TramoListComponent},
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
