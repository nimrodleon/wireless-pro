import {NgModule} from '@html/core';
import {CommonModule} from '@html/common';
import {ReactiveFormsModule} from '@html/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-html';
import {AveriaRoutingModule} from './averia-routing.module';
import {GlobalModule} from '../global/global.module';
import {UserService, AuthService} from '../user/services';
import {AveriaService} from './services/averia.service';
import {AveriaListComponent} from './pages/averia-list/averia-list.component';
import {AveriaModalComponent} from './components/averia-modal/averia-modal.component';
import {AveriaAttendComponent} from './components/averia-attend/averia-attend.component';

@NgModule({
  declarations: [
    AveriaListComponent,
    AveriaModalComponent,
    AveriaAttendComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AveriaRoutingModule,
    CKEditorModule,
    GlobalModule
  ],
  exports: [
    AveriaModalComponent,
    AveriaAttendComponent
  ],
  providers: [
    AveriaService,
    UserService,
    AuthService
  ]
})
export class AveriaModule {
}
