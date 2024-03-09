import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRoutingModule } from './event/event-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EventRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
