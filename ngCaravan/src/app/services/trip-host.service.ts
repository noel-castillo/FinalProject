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
    return this.http.get<TripHost[]>(this.url + '?sorted=true', httpOptions)
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

  create(newTripHost: TripHost) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.post<TripHost>(this.url, newTripHost, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not add Trip Host');
        })
      );
  }

  updateTripHost(host: TripHost) {
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

  delete(id: number) {
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
