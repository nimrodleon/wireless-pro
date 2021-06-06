import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SystemListComponent} from './pages/system-list/system-list.component';
import {GeneralComponent} from './pages/general/general.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: SystemListComponent},
      {path: 'general', component: GeneralComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
