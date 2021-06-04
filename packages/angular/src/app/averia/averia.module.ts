import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalModule} from '../global/global.module';
import {AveriaListComponent} from './pages/averia-list/averia-list.component';
import {FormsModule} from '@angular/forms';
import {AveriaModalComponent} from './components/averia-modal/averia-modal.component';
import {AveriaService} from './services/averia.service';
import {AppRoutingModule} from '../app-routing.module';
import {AveriaAttendComponent} from './components/averia-attend/averia-attend.component';
import {UserService} from '../user/services/user.service';
import {AuthService} from '../user/services/auth.service';

@NgModule({
  declarations: [
    AveriaListComponent,
    AveriaModalComponent,
    AveriaAttendComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GlobalModule,
    AppRoutingModule
  ],
  exports: [
    AveriaListComponent
  ],
  providers: [
    AveriaService,
    UserService,
    AuthService
  ]
})
export class AveriaModule {
}
