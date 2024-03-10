import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Member } from './member'
import { MEMBERS } from './mock-members';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  private memberUrl = 'http://localhost:8000/members/';
  httpOptions = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
  };


  getMembers(): Observable<Member[]>
  {
    return this.http.get<Member[]>(this.memberUrl, this.httpOptions);
  }
  getMember(pk: number): Observable<Member>
  {
    const url = this.memberUrl + pk + '/'
    return this.http.get<Member>(url, this.httpOptions);
  }
}
