import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from './event'
import { EVENTS } from './mock-events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  getEvents(): Observable<Event[]> {
    const events = of(EVENTS);
    return events;
  }
}
