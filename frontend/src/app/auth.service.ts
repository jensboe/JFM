import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
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
