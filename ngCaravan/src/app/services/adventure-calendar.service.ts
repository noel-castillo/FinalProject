import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdventureCalendar } from '../models/adventure-calendar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdventureCalendarService {
  // F i e l d s

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/adventure-calendars';

  // C o n s t r u c t o r

  constructor(private http: HttpClient, private authService: AuthService) {}

  // M e t h o d s

  index() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<AdventureCalendar[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('error');
      })
    );
  }

  create(newAdventureCalendar: AdventureCalendar) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http
      .post<AdventureCalendar>(this.url, newAdventureCalendar, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  update(adventureCalendar: AdventureCalendar) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http
      .put<AdventureCalendar>(
        `${this.url}/${adventureCalendar.id}`,
        adventureCalendar,
        httpOptions
      )
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            'AdventureCalendarService.update(): Error updating adventure calendar'
          );
        })
      );
  }

  delete(id: number) {
    const httpOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    return this.http.delete(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          'AdventureCalendarService.delete(): Error deleting adventure calendar'
        );
      })
    );
  }
}
