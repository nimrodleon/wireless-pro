import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';
import {SystemListComponent} from './pages/system-list/system-list.component';
import {SystemOptionComponent} from './components/system-option/system-option.component';
import {GlobalModule} from '../global/global.module';


@NgModule({
  declarations: [
    SystemListComponent,
    SystemOptionComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    GlobalModule
  ]
})
export class SystemModule {
}
