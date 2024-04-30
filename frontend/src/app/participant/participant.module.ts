import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        UpdateComponent
    ],
    exports: [
        UpdateComponent
    ]
})
export class ParticipantModule { }
