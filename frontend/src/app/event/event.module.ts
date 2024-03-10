import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { EventRoutingModule } from './event-routing.module';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    NgFor,
    MaterialModule,
    HttpClientModule,
    EventRoutingModule
  ],
})
export class EventModule { }
