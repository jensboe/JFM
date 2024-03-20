import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from './event'

import {environment } from  '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  private eventUrl = environment.apiUrl + 'events/';
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
  };


  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl, this.httpOptions);
  }
  getEvent(pk: number): Observable<Event> {
    const url = this.eventUrl + pk + '/'
    return this.http.get<Event>(url, this.httpOptions);
  }
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, event, this.httpOptions);
  }
}
