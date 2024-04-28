import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { loggedinGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'members',
    component: ListComponent,
    canActivate: [loggedinGuard],
  },
  {
    path: 'member/new',
    component: NewComponent,
    canActivate: [loggedinGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
