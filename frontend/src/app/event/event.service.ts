import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Event } from './event'
import { EVENTS } from './mock-events';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private eventUrl = 'http://localhost:8000/events/';
  httpOptions = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
  };


  getEvents(): Observable<Event[]> {

    return this.http.get<Event[]>(this.eventUrl, this.httpOptions)
  }
}
