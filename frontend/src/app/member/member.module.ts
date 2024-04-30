import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        NgFor,
        FormsModule,
        NewComponent,
        ListComponent
    ]
})
export class MemberModule { }
