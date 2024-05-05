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
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../event';
import { EventService } from '../event.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
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
    title: '',
    start_date: new Date(),
    end_date: new Date(),
  };
  starttime: string = '18:00';
  endtime: string = '20:00';
  title = $localize`Add event`;

  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor(
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>
  ) {}

  ngOnInit(): void {
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id) {
      this.getEvent(id);
      this.title = $localize`Edit event`;
    }
  }

  getEvent(id: number): void {
    this.eventService.getEvent(id).subscribe((event) => (this.event = event));
  }
  save() {
    if (this.event) {
      const splitstarttime = this.starttime.split(':');
      const splitendtime = this.endtime.split(':');
      this.event.start_date = new Date(this.event.start_date);
      this.event.end_date = new Date(this.event.end_date);
      this.event.start_date.setHours(
        Number(splitstarttime[0]),
        Number(splitstarttime[1]),
        0,
        0
      );
      this.event.end_date.setHours(
        Number(splitendtime[0]),
        Number(splitendtime[1]),
        0,
        0
      );
      if (this.event.pk) {
        this.eventService.updateEvent(this.event).subscribe((result: Event) => {
          if (result) {
            this.snackBar.open(
              $localize`Event ${result.title} updated.`,
              '',
              { duration: 2000 }
            );
            this.event.title = '';
          } else {
            this.snackBar.open(
              $localize`Event validation error`,
              $localize`ok`
            );
          }
        });
      } else {
        this.eventService.addEvent(this.event).subscribe((result: Event) => {
          if (result) {
            this.snackBar.open(
              $localize`Event ${result.title} saved.`,
              '',
              { duration: 2000 }
            );
            this.event.title = '';
          } else {
            this.snackBar.open(
              $localize`Event validation error`,
              $localize`ok`
            );
          }
        });
      }
    }
  }
  backToEventList() {
    this.router.navigate(['event/list/upcomming']);
  }
}
