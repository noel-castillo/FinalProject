import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categories } from '../models/categories';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  // F I E L D S

  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + 'api/categories';

  categories: Categories[] = [];

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
    return this.http.get<Categories[]>(this.url, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('CategoriesService.index(): Error getting all Categories');
    })
    );
  }

  create(categories: Categories) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
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

  updateCategory(categories: Categories) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'Content-Type':  'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<Categories>(`${this.url}/${categories.id}`, categories, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('CategoriesService.update(): Error updating categories');
      })
    );
  }

  deleteCategory(id: number) {
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
        return throwError('CategoriesService.delete(): Error deleting categories');
      })
    );
  }

}
