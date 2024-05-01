import { Injectable, inject } from '@angular/core';

import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private loginUrl = environment.apiUrl + 'api-token-auth/';
  private token: string = '';
  httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/json'),
  };

  async login(username: string, password: string) {
    await firstValueFrom(
      this.http.post<Token>(
        this.loginUrl,
        { username: username, password: password },
        this.httpOptions
      )
    ).then((result) => {
      if (result.token) {
        localStorage.setItem('token', result.token);
        this.router.navigate(['event/list/upcomming']);
      }
    });
  }

  logout() {
    localStorage.setItem('token', '');
  }

  isloggedin() {
    return this.getToken().length > 4;
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return '';
  }
}
