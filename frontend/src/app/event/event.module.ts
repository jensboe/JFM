import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';

import { HttpClientModule } from '@angular/common/http';
import { ParticipationComponent } from './participation/participation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgFor,
    HttpClientModule,
    FormsModule,
    NewComponent,
    ListComponent,
    ParticipationComponent,
  ],
})
export class EventModule {}
