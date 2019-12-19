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
    return this.http.get<Adventure>(this.url + '/' + id, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('AdventureService.show(): Error getting adventure by ID');
    })
    );
  }
  create(createForm: NgForm) {
    console.log('in create in service');
    console.log(createForm);
    const newAdventure = {
        title: createForm.value.title,
        description: createForm.value.description,
        activityLvl: createForm.value.activityLvl,
        includes: createForm.value.includes,
        price: createForm.value.price,
        enabled: true,
        itinerary: createForm.value.itinerary,
        address: {
            street: createForm.value.street,
            city: createForm.value.city,
            state: createForm.value.state,
            zip: createForm.value.zip
        }
    };
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Adventure>(this.url, newAdventure, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('AdventureService.create(): Error creating new adventure');
      })
    );
  }
  update(adventure: Adventure) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.url + '/' + adventure.id, adventure, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('AdventureService.update(): Error updating adventure');
      })
    );
  }

  destroy(adventure: Adventure) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'

      })
    };
    return this.http.delete(this.url + '/' + adventure.id, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('AdventureService.destroy(): Error deleting adventure by id');
      })
    );
  }
}
