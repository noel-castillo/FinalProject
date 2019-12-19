import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TripTraveler } from '../models/trip-traveler';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripTravelerService {
// F i e l d s
private baseUrl = 'http://localhost:8090';
private url = this.baseUrl + 'api/trips';

// C o n s t r u c t o r

constructor(private http: HttpClient) { }

// M e t h o d s

index() {
  const httpOptions = {
    headers: new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest'
    })
  };
  return this.http.get<TripTraveler[]>(this.url, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('error');
      })
    );
}

create(newTripTraveler: TripTraveler) {

  const httpOptions = {
    headers: new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type':  'application/json'
    })
  };

  return this.http.post<TripTraveler>(this.url, newTripTraveler, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('error');
      })
    );
}

update(tripTraveler: TripTraveler) {

  const httpOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': 'application/json'
      }
  };
  return this.http.put<TripTraveler>(`${this.url}/${tripTraveler.id}`, tripTraveler, httpOptions).pipe(
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
