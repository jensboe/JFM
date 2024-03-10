import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRoutingModule } from './event/event-routing.module';
import { MemberRoutingModule } from './member/member-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EventRoutingModule,
    MemberRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
