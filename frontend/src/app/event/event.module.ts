import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    NgFor,
    MaterialModule
  ],
  exports: [
    NewComponent,
    ListComponent
  ]
})
export class EventModule { }
