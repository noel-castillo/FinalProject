import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TripCalendar } from '../models/trip-calendar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripCalendarService {

  // F i e l d s

  private baseUrl = 'http://localhost:8090';
  private url = this.baseUrl + 'api/tripCalendars';

  // C o n s t r u c t o r

  constructor(private http: HttpClient) { }

  // M e t h o d s

  index() {
    const httpOptions = {
      headers: new HttpHeaders({
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

  create(newTripCalendar: TripCalendar) {

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':  'application/json'
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

  update(tripCalendar: TripCalendar) {

    const httpOptions = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type': 'application/json'
        }
    };
    return this.http.put<TripCalendar>(`${this.url}/${tripCalendar.id}`, tripCalendar, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripCalendarService.update(): Error updating trip calendar');
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
        return throwError('TripCalendarService.delete(): Error deleting trip calendar');
      })
    );
  }
}
