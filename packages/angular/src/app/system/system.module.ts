import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {GlobalModule} from '../global/global.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemListComponent} from './pages/system-list/system-list.component';
import {SystemOptionComponent} from './components/system-option/system-option.component';
import {GeneralComponent} from './pages/general/general.component';
import {ServicePlanComponent} from './pages/service-plan/service-plan.component';
import {ServicePlanModalComponent} from './components/service-plan-modal/service-plan-modal.component';
import {CoverageListComponent} from './pages/coverage-list/coverage-list.component';
import {CoverageModalComponent} from './components/coverage-modal/coverage-modal.component';


@NgModule({
  declarations: [
    SystemListComponent,
    SystemOptionComponent,
    GeneralComponent,
    ServicePlanComponent,
    ServicePlanModalComponent,
    CoverageListComponent,
    CoverageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SystemRoutingModule,
    GlobalModule
  ]
})
export class SystemModule {
}
