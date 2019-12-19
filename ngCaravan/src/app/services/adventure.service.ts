import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Adventure } from '../models/adventure';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/adventures';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  index() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Adventure[]>(this.url, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('AdventureService.index(): Error getting all adventures');
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
    return this.http.get<Adventure>(this.url + id, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('AdventureService.show(): Error getting adventure by ID');
    })
    );
  }
  create(adventure: Adventure) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Adventure>(this.url, adventure, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('AdventureService.create(): Error creating new adventure');
      })
    );
  }
  update(adventure: Adventure, aid: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.url + '/' + aid, adventure, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('AdventureService.update(): Error updating adventure');
      })
    );
  }

  destroy(adventure: Adventure, aid: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'

      })
    };
    return this.http.delete(this.url + '/' + aid, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('AdventureService.destroy(): Error deleting adventure by id');
      })
    );
  }
}
