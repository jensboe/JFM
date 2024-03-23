import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface Token {
  token: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private loginUrl = environment.apiUrl + 'api-token-auth/';
  private token: string = ""
  httpOptions = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
  };


  login(username: string, password: string)
  {
    this.http.post<Token>(this.loginUrl, {'username': username, 'password': password}, this.httpOptions).subscribe(
      result => {
        if (result.token)
        {
          localStorage.setItem('token', result.token);
        }
      }
      
      );
  }

  isloggedin()
  {
    return this.getToken().length > 4;
  }

  getToken(): string
  {
    const token = localStorage.getItem('token')
    if (token)
    {
      return token;
    }
    return '';
  }
}
