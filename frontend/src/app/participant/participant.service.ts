import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participant } from './participant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  private participantUrl = 'http://localhost:8000/participations/';
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
  };
  getParticipations(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.participantUrl, this.httpOptions);
  }
  getParticipant(pk: Number): Observable<Participant> {
    const url = this.participantUrl + pk + '/'
    return this.http.get<Participant>(url, this.httpOptions);
  }
}