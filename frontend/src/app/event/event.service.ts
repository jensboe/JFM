import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './event';

import { formatDate } from '@angular/common';
import { environment } from '../../environments/environment';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root',
})
export class EventService extends RestService {
  private eventUrl = environment.apiUrl + 'events/';

  getEvents(): Observable<Event[]> {
    return this.get<Event[]>(this.eventUrl);
  }

  getEventsNext(): Observable<Event[]> {
    return this.get<Event[]>(
      this.eventUrl +
        '?ordering=start_date&end_after=' +
        formatDate(Date.now(), 'yyyy-MM-dd', 'en')
    );
  }

  getEventsLast(): Observable<Event[]> {
    return this.get<Event[]>(
      this.eventUrl +
        '?ordering=/start_date&start_before=' +
        formatDate(Date.now(), 'yyyy-MM-dd', 'en')
    );
  }

  getEvent(pk: number): Observable<Event> {
    const url = this.eventUrl + pk + '/';
    return this.get<Event>(url);
  }

  addEvent(event: Event): Observable<Event> {
    return this.post<Event>(this.eventUrl, event);
  }
}
