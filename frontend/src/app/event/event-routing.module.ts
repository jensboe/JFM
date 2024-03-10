import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path: 'event/list', component: ListComponent},
  {path: 'event/new', component: NewComponent},
  {path: 'event/:id', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
