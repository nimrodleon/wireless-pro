import {NgModule} from '@html/core';
import {CommonModule} from '@html/common';
import {FormsModule} from '@html/forms';
import {GlobalModule} from '../global/global.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-html';
import {SystemRoutingModule} from './system-routing.module';
import {AuthService} from '../user/services';
import {BitWorkerService, InterfaceService, MikrotikService} from './services';
import {SystemListComponent} from './pages/system-list/system-list.component';
import {SystemOptionComponent} from './components/system-option/system-option.component';
import {GeneralComponent} from './pages/general/general.component';
import {ServicePlanComponent} from './pages/service-plan/service-plan.component';
import {ServicePlanModalComponent} from './components/service-plan-modal/service-plan-modal.component';
import {CoverageListComponent} from './pages/coverage-list/coverage-list.component';
import {CoverageModalComponent} from './components/coverage-modal/coverage-modal.component';
import {MaterialComponent} from './pages/material/material.component';
import {MaterialModalComponent} from './components/material-modal/material-modal.component';
import {TowerListComponent} from './pages/tower-list/tower-list.component';
import {TramoListComponent} from './pages/tramo-list/tramo-list.component';
import {TowerModalComponent} from './components/tower-modal/tower-modal.component';
import {TramoModalComponent} from './components/tramo-modal/tramo-modal.component';
import {MikrotikListComponent} from './pages/mikrotik-list/mikrotik-list.component';
import {MikrotikFormComponent} from './components/mikrotik-form/mikrotik-form.component';
import {MikrotikBadgeComponent} from './components/mikrotik-badge/mikrotik-badge.component';
import {ServicePlanBadgeComponent} from './components/service-plan-badge/service-plan-badge.component';

@NgModule({
  declarations: [
    SystemListComponent,
    SystemOptionComponent,
    GeneralComponent,
    ServicePlanComponent,
    ServicePlanModalComponent,
    CoverageListComponent,
    CoverageModalComponent,
    MaterialComponent,
    MaterialModalComponent,
    TowerListComponent,
    TowerModalComponent,
    TramoListComponent,
    TramoModalComponent,
    MikrotikListComponent,
    MikrotikFormComponent,
    MikrotikBadgeComponent,
    ServicePlanBadgeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SystemRoutingModule,
    GlobalModule,
    CKEditorModule
  ],
  providers: [
    AuthService,
    MikrotikService,
    InterfaceService,
    BitWorkerService
  ]
})
export class SystemModule {
}
