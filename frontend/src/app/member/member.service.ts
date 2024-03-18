import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Member } from './member'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  private memberUrl = environment.apiUrl + 'members/';
  httpOptions = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
  };


  getMembers(): Observable<Member[]>
  {
    return this.http.get<Member[]>(this.memberUrl, this.httpOptions);
  }
  getMember(pk: Number): Observable<Member>
  {
    const url = this.memberUrl + pk + '/'
    return this.http.get<Member>(url, this.httpOptions);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.memberUrl, member, this.httpOptions);
  }
}