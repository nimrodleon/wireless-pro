import {NgModule} from '@html/core';
import {Routes, RouterModule} from '@html/router';
import {DevicesListComponent} from './pages/devices-list/devices-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DevicesListComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule {
}
