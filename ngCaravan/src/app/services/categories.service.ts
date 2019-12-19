import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categories } from '../models/categories';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  // F I E L D S


  baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/categories';

  categories: Categories[] = [];

  // C O N S T R U C T O R

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  // M E T H O D S

  index() {

    // if (this.authService.checkLogin()) {
    //   return null;
    // }

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Categories[]>(this.url, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('CategoriesService.index(): Error getting all Categories');
    })
    );
  }

  create(categories: Categories) {

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Categories>(this.url, categories, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  update(categories: Categories) {

    const httpOptions = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type': 'application/json'
        }
    };
    return this.http.put<Categories>(`${this.url}/${categories.id}`, categories, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('CategoriesService.update(): Error updating categories');
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
        return throwError('CategoriesService.delete(): Error deleting categories');
      })
    );
  }

}
