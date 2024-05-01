import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDateRangeInput,
  MatDateRangePicker,
  MatDatepickerToggle,
  MatEndDate,
  MatStartDate,
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../event';
import { EventService } from '../event.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatDateRangeInput,
    MatStartDate,
    MatEndDate,
    MatDatepickerToggle,
    MatSuffix,
    MatDateRangePicker,
    MatButton,
  ],
})
export class NewComponent implements OnInit {
  event: Event = {
    pk: 1,
    title: '',
    start_date: new Date(),
    end_date: new Date(),
  };
  starttime: string = '18:00';
  endtime: string = '20:00';

  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  constructor(
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.getEvent();
  }

  getEvent(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id) {
      this.eventService.getEvent(id).subscribe((event) => (this.event = event));
    }
  }
  save() {
    if (this.event) {
      const splitstarttime = this.starttime.split(':');
      this.event.start_date.setHours(
        Number(splitstarttime[0]),
        Number(splitstarttime[1]),
        0,
        0
      );
      const splitendtime = this.endtime.split(':');
      this.event.end_date.setHours(
        Number(splitendtime[0]),
        Number(splitendtime[1]),
        0,
        0
      );
      this.eventService.addEvent(this.event).subscribe((result: Event) => {
        if (result) {
          let snackBarRef = this.snackBar.open(
            $localize`Event ${result.title} saved.`,
            '',
            { duration: 2000 }
          );
          this.event.title = '';
        } else {
          let snackBarRef = this.snackBar.open(
            $localize`Event validation error`,
            $localize`ok`
          );
        }
      });
    }
  }
  cancel() {}
}
