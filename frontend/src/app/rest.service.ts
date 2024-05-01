import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'token ' + this.auth.getToken()),
  };

  protected get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url, this.httpOptions)
      .pipe(catchError(this.handleError<T>('GET', url)));
  }

  protected post<T>(url: string, body: T): Observable<T> {
    return this.http
      .post<T>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<T>('POST', url)));
  }
  protected put<T>(url: string, body: T): Observable<T> {
    return this.http
      .put<T>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<T>('PUT', url)));
  }

  protected handleError<T>(requesttype = 'unknown', url: string, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(
        requesttype +
          ' failed. ' +
          error.status +
          '(' +
          error.statusText +
          ') URL: ' +
          url
      );
      return of(result as T);
    };
  }
}
