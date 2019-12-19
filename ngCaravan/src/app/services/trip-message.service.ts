import { TripMessage } from './../models/trip-message';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripMessageService {
  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/';

  messages: TripMessage[] = [];

  // C O N S T R U C T O R

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  // M E T H O D S

  index() {
    if (this.authService.checkLogin()) {
      return null;
    }

    // Make credentials
    const credentials = this.authService.getCredentials();
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    // this.checkLogin();
    return this.http.get<TripMessage[]>(this.url + 'messages/?sorted=true', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  checkLogin(): boolean {
    if (this.authService.getCredentials() === null) {
      this.router.navigateByUrl('login');
      return false;
    } else {
      this.router.navigateByUrl('hosts');
      return true;
    }
  }

  create(newMessage: TripMessage) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.post<TripMessage>(this.url, newMessage, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not add Trip Host');
        })
      );
  }

  updateTripMessage(message: TripMessage) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.put(this.url + 'messages/' + message.id, message, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not update Trip Host');
        })
      );
  }

  delete(id: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.delete(this.url + 'messages/' + id, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not delete Trip Host');
        })
      );

  }
}
