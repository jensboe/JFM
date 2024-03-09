import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    NewComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    NgFor
  ],
  exports: [
    NewComponent,
    ListComponent
  ]
})
export class EventModule { }
