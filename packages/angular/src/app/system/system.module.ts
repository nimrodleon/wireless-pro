import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GlobalModule} from '../global/global.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemListComponent} from './pages/system-list/system-list.component';
import {SystemOptionComponent} from './components/system-option/system-option.component';
import {GeneralComponent} from './pages/general/general.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SystemListComponent,
    SystemOptionComponent,
    GeneralComponent
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
