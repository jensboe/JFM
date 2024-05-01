import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { RestService } from '../rest.service';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class MemberService extends RestService {
  private memberUrl = environment.apiUrl + 'members/';

  getMembers(): Observable<Member[]> {
    return this.get<Member[]>(this.memberUrl);
  }

  getMember(pk: number): Observable<Member> {
    const url = this.memberUrl + pk + '/';
    return this.get<Member>(url);
  }

  addMember(member: Member): Observable<Member> {
    return this.post<Member>(this.memberUrl, member);
  }
}
