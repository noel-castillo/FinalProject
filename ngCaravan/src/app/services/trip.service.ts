import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  // F i e l d s
  private baseUrl = 'http://localhost:8090';
  private url = environment.baseUrl + 'api/trips';

  // C o n s t r u c t o r

  constructor(private http: HttpClient) { }

  // M e t h o d s

  index() {
    const httpOptions = {
      headers: new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Trip[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  create(newTrip: Trip) {

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Trip>(this.url, newTrip, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  update(trip: Trip) {

    const httpOptions = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type': 'application/json'
        }
    };
    return this.http.put<Trip>(`${this.url}/${trip.id}`, trip, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripService.update(): Error updating trip');
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
        return throwError('TripService.delete(): Error deleting trip');
      })
    );
  }
}
