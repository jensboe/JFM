import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent as EditComponent } from './edit/edit.component';
import { ParticipationComponent } from './participation/participation.component';
import { loggedinGuard } from '../auth.guard';

export const eventRoutes: Routes = [
  {
    path: 'list/:mode',
    component: ListComponent,
    title: 'Events',
    canActivate: [loggedinGuard],
  },
  {
    path: 'new',
    component: EditComponent,
    title: 'New event',
    canActivate: [loggedinGuard],
  },
  {
    path: ':id/edit',
    component: EditComponent,
    title: 'Edit event',
    canActivate: [loggedinGuard],
  },
  {
    path: ':id/participation',
    component: ParticipationComponent,
    title: 'Check participation',
    canActivate: [loggedinGuard],
  },
];
