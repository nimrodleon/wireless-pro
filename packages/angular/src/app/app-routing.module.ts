import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {SystemComponent} from './system/system.component';
import {GeneralComponent} from './general/general.component';
import {AveriaListComponent} from './averia/averia-list/averia-list.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // {path: 'ticket/:id', component: TicketComponent, canActivate: [AuthGuard]},
  {path: 'system', component: SystemComponent, canActivate: [AuthGuard]},
  {path: 'general', component: GeneralComponent, canActivate: [AuthGuard]},
  // {path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard]},
  // {path: 'task-detail/:id', component: TaskDetailComponent, canActivate: [AuthGuard]},
  // {path: 'material', component: MaterialComponent, canActivate: [AuthGuard]},
  // {path: 'tasks-list', component: MaterialOutComponent, canActivate: [AuthGuard]},
  {path: 'averia', component: AveriaListComponent, canActivate: [AuthGuard]},
  // {path: 'devices', component: DevicesListComponent, canActivate: [AuthGuard]},
  // {path: 'tower', component: TowerListComponent, canActivate: [AuthGuard]},
  // {path: 'tramo', component: TramoListComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/averia', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
