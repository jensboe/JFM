import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { ParticipationComponent } from './participation/participation.component';

const routes: Routes = [
  {
    path: 'event/:mode',
    component: ListComponent,
    title: 'Events'
  },
  {
    path: 'newevent',
    component: NewComponent,
    title: 'New event'
  },
  {
    path: 'event/participation/:id',
    component: ParticipationComponent,
    title: 'Check participation'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
