import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Member } from './member';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  private memberUrl = environment.apiUrl + 'members/';
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'token ' + this.auth.getToken()),
  };

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl, this.httpOptions);
  }
  getMember(pk: number): Observable<Member> {
    const url = this.memberUrl + pk + '/';
    return this.http.get<Member>(url, this.httpOptions);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.memberUrl, member, this.httpOptions);
  }
}
