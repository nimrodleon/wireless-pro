import {NgModule} from '@html/core';
import {Routes, RouterModule} from '@html/router';
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
