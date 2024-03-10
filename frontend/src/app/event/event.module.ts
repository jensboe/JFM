import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail/detail.component';
import { EventRoutingModule } from './event-routing.module';
import { FormsModule } from '@angular/forms';


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
    EventRoutingModule,
    FormsModule
  ],
})
export class EventModule { }
