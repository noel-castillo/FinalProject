import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TripTraveler } from '../models/trip-traveler';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripTravelerService {
  // F i e l d s
  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/tripTravelers';

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
    return this.http.get<TripTraveler[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('error');
      })
    );
  }

  myTripRequests() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http
      .get<TripTraveler[]>(this.baseUrl + 'api/myTripRequests', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );

  }
  getRequests() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http
      .get<TripTraveler[]>(this.baseUrl + '/tripHostTravelers', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }
  createTripTraveler(newTripTraveler: TripTraveler, tid: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    // tslint:disable-next-line: max-line-length
    newTripTraveler.travelerStatus = 'pending';
    return this.http
      .post<TripTraveler>(
        this.baseUrl + 'api/trips/' + tid + '/tripTravelers',
        newTripTraveler,
        httpOptions
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  updateTripTraveler(tripTraveler: TripTraveler) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http
      .put<TripTraveler>(
        `${this.url}/${tripTraveler.id}`,
        tripTraveler,
        httpOptions
      )
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError('TripService.update(): Error updating trip');
        })
      );
  }

  deleteTripTraveler(id: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.delete(`${this.url}/${id}`, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('TripService.delete(): Error deleting trip');
      })
    );
  }
}
