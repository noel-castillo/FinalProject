import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TripHost } from '../models/trip-host';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripHostService {

  // F I E L D S

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/hosts';

  hosts: TripHost[] = [];

  // C O N S T R U C T O R

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) { }

  // M E T H O D S

  index() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<TripHost[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }
  show(id: string) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<TripHost>(this.url + '/' + id, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('TripHostService.show(): Error getting host review of passenger by ID');
    })
    );
  }

  create(createForm: NgForm) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<TripHost>(this.url, createForm, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not add Trip Host');
        })
      );
  }

  update(host: TripHost) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.put(this.url + '/' + host.id, host, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not update Trip Host');
        })
      );
  }

  destroy(id: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.delete(this.url + '/' + id, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not delete Trip Host');
        })
      );

  }

}
