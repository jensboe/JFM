import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatLuxonDateModule
  ],
  exports: [
    MatSlideToggleModule,
  ]
})
export class MaterialModule { }
