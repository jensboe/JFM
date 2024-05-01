import { Injectable } from '@angular/core';
import { Observable, mergeMap, timer } from 'rxjs';
import { environment } from '../../environments/environment';
import { RestService } from '../rest.service';
import { Participant } from './participant';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService extends RestService {
  private participantUrl = environment.apiUrl + 'participants/';

  getParticipations(): Observable<Participant[]> {
    return this.get<Participant[]>(this.participantUrl);
  }

  getParticipant(pk: number): Observable<Participant> {
    const url = this.participantUrl + pk + '/';
    return timer(0, 5000).pipe(mergeMap(() => this.get<Participant>(url)));
  }

  updateParticipant(participant: Participant) {
    return this.put(this.participantUrl + participant.pk + '/', participant);
  }
}
