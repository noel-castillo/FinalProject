import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TripCalendar } from '../models/trip-calendar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripCalendarService {

  // F i e l d s

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/tripCalendars';

  // C o n s t r u c t o r

  constructor(private http: HttpClient, private authService: AuthService) { }

  // M e t h o d s

  index() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<TripCalendar[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  createTripCalendar(newTripCalendar: TripCalendar) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.post<TripCalendar>(this.url, newTripCalendar, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  updateTripCalendar(tripCalendar: TripCalendar) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<TripCalendar>(`${this.url}/${tripCalendar.id}`, tripCalendar, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripCalendarService.update(): Error updating trip calendar');
      })
    );
  }

  deleteTripCalendar(id: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.delete(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripCalendarService.delete(): Error deleting trip calendar');
      })
    );
  }
}
