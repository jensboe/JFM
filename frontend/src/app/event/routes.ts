import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
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
    component: NewComponent,
    title: 'New event',
    canActivate: [loggedinGuard],
  },
  {
    path: ':id/participation',
    component: ParticipationComponent,
    title: 'Check participation',
    canActivate: [loggedinGuard],
  },
];
