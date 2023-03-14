import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AveriaListComponent} from './pages/averia-list/averia-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: AveriaListComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AveriaRoutingModule {
}
