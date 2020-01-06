import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Address } from '../models/address';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  // F i e l d s

  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/addresses';

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
    return this.http.get<Address[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }


  create(address: Address) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.post<Address>(this.url, address, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  updateAddress(address: Address) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<Address>(`${this.url}/${address.id}`, address, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('AddressService.update(): Error updating address');
      })
    );
  }

  delete(id: number) {
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
        return throwError('AddressService.delete(): Error deleting address');
      })
    );
  }
}
