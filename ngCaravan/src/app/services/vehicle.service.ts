import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  // F I E L D S

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/vehicles';

  vehicles: Vehicle[] = [];

  // C O N S T R U C T O R

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  // M E T H O D S

  index() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    // this.checkLogin();
    return this.http.get<Vehicle[]>(this.url + '?sorted=true', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  getVehiclesByUser() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.get<Vehicle[]>(this.url + '/user/' + '?sorted=true', httpOptions)
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
      this.router.navigateByUrl('vehicles');
      return true;
    }
  }

  create(newVehicle: Vehicle) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.post<Vehicle>(this.url, newVehicle, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not add Vehicle');
        })
      );
  }

  updateVehicle(vehicle: Vehicle) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.put(this.url + '/' + vehicle.id, vehicle, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not update Vehicle');
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
          return throwError('Could not delete Vehicle');
        })
      );
  }
}
