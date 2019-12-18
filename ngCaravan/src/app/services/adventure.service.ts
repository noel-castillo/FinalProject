import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Adventure } from '../models/adventure';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {

  baseUrl = 'http://localhost:8090';
  private url = 'api/adventures';

  constructor(
    private http: HttpClient
  ) { }

  index() {
    const httpOptions = {
      headers: new HttpHeaders({
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



}
