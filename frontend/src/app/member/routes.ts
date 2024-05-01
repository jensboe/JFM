import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './edit/edit.component';
import { loggedinGuard } from '../auth.guard';

export const memberRoutes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [loggedinGuard],
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [loggedinGuard],
  },
  {
    path: ':id/edit',
    component: NewComponent,
    canActivate: [loggedinGuard],
  },
];
