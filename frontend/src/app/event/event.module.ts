import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';



@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewComponent
  ]
})
export class EventModule { }
