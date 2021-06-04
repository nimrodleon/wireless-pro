import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {SystemComponent} from './system/system.component';
import {GeneralComponent} from './general/general.component';
import {TicketComponent} from './ticket/ticket.component';
import {AveriaListComponent} from './averia/pages/averia-list/averia-list.component';
import {TasksListComponent} from './tasks/pages/tasks-list/tasks-list.component';
import {TaskDetailComponent} from './tasks/pages/task-detail/task-detail.component';
import {MaterialComponent} from './tasks/pages/material/material.component';
import {MaterialOutComponent} from './tasks/pages/material-out/material-out.component';
import {DevicesListComponent} from './devices/devices-list/devices-list.component';
import {TowerListComponent} from './devices/tower-list/tower-list.component';
import {TramoListComponent} from './devices/tramo-list/tramo-list.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'ticket/:id', component: TicketComponent, canActivate: [AuthGuard]},
  {path: 'system', component: SystemComponent, canActivate: [AuthGuard]},
  {path: 'general', component: GeneralComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard]},
  {path: 'task-detail/:id', component: TaskDetailComponent, canActivate: [AuthGuard]},
  {path: 'material', component: MaterialComponent, canActivate: [AuthGuard]},
  {path: 'tasks-list', component: MaterialOutComponent, canActivate: [AuthGuard]},
  {path: 'averia', component: AveriaListComponent, canActivate: [AuthGuard]},
  {path: 'devices', component: DevicesListComponent, canActivate: [AuthGuard]},
  {path: 'tower', component: TowerListComponent, canActivate: [AuthGuard]},
  {path: 'tramo', component: TramoListComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/averia', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
