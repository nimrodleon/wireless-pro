import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GlobalModule} from '../global/global.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {TaskService} from './task.service';
import {MaterialService} from './material.service';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TaskModalComponent} from './task-modal/task-modal.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {AddMaterialComponent} from './add-material/add-material.component';
import {AddUserComponent} from './add-user/add-user.component';
import {MaterialComponent} from './material/material.component';
import {MaterialModalComponent} from './material-modal/material-modal.component';
import {Quantity2Component} from './quantity2/quantity2.component';
import {MaterialOutComponent} from './material-out/material-out.component';
import {UserService} from '../user/user.service';
import {AuthService} from '../user/auth.service';
import {PriceComponent} from './price/price.component';

@NgModule({
  declarations: [
    TasksListComponent,
    TaskModalComponent,
    TaskDetailComponent,
    AddMaterialComponent,
    AddUserComponent,
    MaterialComponent,
    MaterialModalComponent,
    Quantity2Component,
    MaterialOutComponent,
    PriceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    GlobalModule,
    AppRoutingModule
  ],
  exports: [
    TasksListComponent,
    TaskDetailComponent,
    MaterialComponent,
    MaterialOutComponent
  ],
  providers: [
    TaskService,
    MaterialService,
    UserService,
    AuthService
  ]
})
export class TasksModule {
}
