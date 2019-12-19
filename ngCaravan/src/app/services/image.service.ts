import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Image } from '../models/image';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // F i e l d s
  private baseUrl = 'http://localhost:8090';
  private url = this.baseUrl + 'api/images';

  // C o n s t r u c t o r

  constructor(private http: HttpClient) { }

  // M e t h o d s

  index() {
    const httpOptions = {
      headers: new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Image[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  create(newImage: Image) {

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Image>(this.url, newImage, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error');
        })
      );
  }

  update(image: Image) {

    const httpOptions = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type': 'application/json'
        }
    };
    return this.http.put<Image>(`${this.url}/${image.id}`, image, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('ImageService.update(): Error updating iamge');
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
        return throwError('ImageService.delete(): Error deleting image');
      })
    );
  }
}
