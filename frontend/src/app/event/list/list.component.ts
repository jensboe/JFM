import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event'
import { Participant } from '../../participant/participant';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'event-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{
  events: Event[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.events = []
      this.getEvents(params['mode']);
    });
  }

  ngOnInit(): void {

  }

  getEvents(mode: string = "last"): void {
    if (mode != 'last' && mode != 'upcomming')
    {
      mode = 'last'
    }
    if(mode == 'last')
    {
      this.eventService.getEventsLast()
      .subscribe(
        events => {
          this.events = events;
        }
      );
    }
    if(mode == 'upcomming')
    {
      this.eventService.getEventsNext()
      .subscribe(
        events => {
          this.events = events;
        }
      );
    }
  }

  getAbsent(partipants: Participant[]| undefined)
  {
    if (partipants)
    {
      return partipants.filter(o => o.participation === "ABS").length;
    }
    return 0;
  }

  getExcused(partipants: Participant[] | undefined)
  {
    if (partipants)
    {
      return partipants.filter(o => o.participation === "EXC").length;
    }
    return 0;
  }

  getPresent(partipants: Participant[] | undefined)
  {
    if (partipants)
    {
      return partipants.filter(o => o.participation === "PRE").length;
    }
    return 0;
  }
}