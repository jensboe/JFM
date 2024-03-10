import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event'


@Component({
  selector: 'event-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
    .subscribe(events => this.events = events);
  }
}
