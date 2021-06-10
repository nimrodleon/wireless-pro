import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalModule} from '../global/global.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TasksRoutingModule} from './tasks-routing.module';
import {TaskService} from './services/task.service';
import {MaterialService} from '../system/services/material.service';
import {TasksListComponent} from './pages/tasks-list/tasks-list.component';
import {TaskModalComponent} from './components/task-modal/task-modal.component';
import {TaskDetailComponent} from './pages/task-detail/task-detail.component';
import {AddMaterialComponent} from './components/add-material/add-material.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {Quantity2Component} from './components/quantity2/quantity2.component';
import {MaterialOutComponent} from './pages/material-out/material-out.component';
import {UserService} from '../user/services/user.service';
import {AuthService} from '../user/services/auth.service';
import {PriceComponent} from './components/price/price.component';

@NgModule({
  declarations: [
    TasksListComponent,
    TaskModalComponent,
    TaskDetailComponent,
    AddMaterialComponent,
    AddUserComponent,
    Quantity2Component,
    MaterialOutComponent,
    PriceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TasksRoutingModule,
    GlobalModule
  ],
  providers: [
    UserService,
    AuthService,
    TaskService,
    MaterialService,
  ]
})
export class TasksModule {
}
