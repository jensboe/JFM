import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRoutingModule } from './event/event-routing.module';
import { MemberRoutingModule } from './member/member-routing.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    EventRoutingModule,
    MemberRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
