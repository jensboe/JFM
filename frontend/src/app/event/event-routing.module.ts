import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { ParticipationComponent } from './participation/participation.component';
import { loggedinGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'event/:mode',
    component: ListComponent,
    title: 'Events',
    canActivate: [loggedinGuard],
  },
  {
    path: 'newevent',
    component: NewComponent,
    title: 'New event',
    canActivate: [loggedinGuard],
  },
  {
    path: 'event/participation/:id',
    component: ParticipationComponent,
    title: 'Check participation',
    canActivate: [loggedinGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
