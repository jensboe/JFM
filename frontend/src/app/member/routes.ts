import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
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
];
