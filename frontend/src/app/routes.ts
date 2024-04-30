import { Routes } from '@angular/router';

const routeConfig: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent)
  },
  {
    path: 'member',
    loadChildren: () => import('./member/routes').then(m => m.memberRoutes )
  },
  {
    path: 'event',
    loadChildren: () => import('./event/routes').then(m => m.eventRoutes )
  }
];

export default routeConfig;
