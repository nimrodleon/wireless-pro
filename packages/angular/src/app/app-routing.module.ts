import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {TicketComponent} from './ticket/ticket.component';
import {AveriaListComponent} from './averia/pages/averia-list/averia-list.component';
import {TasksListComponent} from './tasks/pages/tasks-list/tasks-list.component';
import {TaskDetailComponent} from './tasks/pages/task-detail/task-detail.component';
import {MaterialOutComponent} from './tasks/pages/material-out/material-out.component';
import {DevicesListComponent} from './devices/pages/devices-list/devices-list.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'ticket/:id', component: TicketComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard]},
  {path: 'task-detail/:id', component: TaskDetailComponent, canActivate: [AuthGuard]},
  {path: 'tasks-list', component: MaterialOutComponent, canActivate: [AuthGuard]},
  {path: 'averia', component: AveriaListComponent, canActivate: [AuthGuard]},
  {path: 'devices', component: DevicesListComponent, canActivate: [AuthGuard]},
  {
    path: 'system',
    loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: '/averia', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
