import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TasksListComponent} from './pages/tasks-list/tasks-list.component';
import {TaskDetailComponent} from './pages/task-detail/task-detail.component';
import {MaterialOutComponent} from './pages/material-out/material-out.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: TasksListComponent},
      {path: 'task-detail/:id', component: TaskDetailComponent},
      {path: 'tasks-list', component: MaterialOutComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
