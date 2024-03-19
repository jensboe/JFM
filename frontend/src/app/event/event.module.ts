import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ParticipationComponent } from './participation/participation.component';
import { EventRoutingModule } from './event-routing.module';
import { FormsModule } from '@angular/forms';
import { ParticipantModule } from '../participant/participant.module';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
    ParticipationComponent,
  ],
  imports: [
    CommonModule,
    NgFor,
    MaterialModule,
    HttpClientModule,
    EventRoutingModule,
    FormsModule,
    ParticipantModule
  ],
})
export class EventModule { }
