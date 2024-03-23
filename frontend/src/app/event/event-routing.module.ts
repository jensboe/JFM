import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { ParticipationComponent } from './participation/participation.component';

const routes: Routes = [
  {path: 'event/:mode', component: ListComponent},
  {path: 'event/new', component: NewComponent},
  {path: 'event/participation/:id', component: ParticipationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
