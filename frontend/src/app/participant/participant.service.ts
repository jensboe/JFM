import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participant } from './participant';
import { Observable, catchError, mergeMap, of, timer } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  private participantUrl = environment.apiUrl + 'participations/';
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
  };
  getParticipations(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.participantUrl, this.httpOptions);
  }
  getParticipant(pk: Number): Observable<Participant> {
    const url = this.participantUrl + pk + '/'

    return timer(0, 5000).pipe(
      mergeMap(() => this.http.get<Participant>(url, this.httpOptions))
    )
  }
  updateParticipant(participant: Participant) {
    return this.http.put(this.participantUrl + participant.pk + '/', participant, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateparticipant'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  

  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}