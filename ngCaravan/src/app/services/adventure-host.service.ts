import { Injectable } from '@angular/core';
import { AdventureHost } from '../models/adventure-host.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdventureHostService {

  // F I E L D S

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/adventureHosts';

  adventureHosts: AdventureHost[] = [];

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
    return this.http.get<AdventureHost[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error in Adventure Host Service INDEX()');
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
    return this.http.get<AdventureHost>(this.url + '/' + id, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('AdventureHostService.show(): Error getting host review of passenger by ID');
    })
    );
  }

  create(createForm: NgForm) {
    const newTripHost = {
      rating: createForm.value.rating,
      review: createForm.value.review
    }
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<AdventureHost>(this.url, createForm, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not add Adventure Host');
        })
      );
  }

  update(host: AdventureHost) {
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
          return throwError('Could not update Adventure Host');
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
          return throwError('Could not delete Adventure Host');
        })
      );

  }



}
