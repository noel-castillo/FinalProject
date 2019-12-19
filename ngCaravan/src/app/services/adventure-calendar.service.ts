import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdventureCalendar } from '../models/adventure-calendar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdventureCalendarService {
 // F i e l d s

 private baseUrl = 'http://localhost:8090';
 private url = environment.baseUrl + 'api/adventureCalendars';

 // C o n s t r u c t o r

 constructor(private http: HttpClient) { }

 // M e t h o d s

 index() {
   const httpOptions = {
     headers: new HttpHeaders({
     'X-Requested-With': 'XMLHttpRequest'
     })
   };
   return this.http.get<AdventureCalendar[]>(this.url, httpOptions)
     .pipe(
       catchError((err: any) => {
         console.log(err);
         return throwError('error');
       })
     );
 }

 create(newAdventureCalendar: AdventureCalendar) {

   const httpOptions = {
     headers: new HttpHeaders({
       'X-Requested-With': 'XMLHttpRequest',
       'Content-Type':  'application/json'
     })
   };

   return this.http.post<AdventureCalendar>(this.url, newAdventureCalendar, httpOptions)
     .pipe(
       catchError((err: any) => {
         console.log(err);
         return throwError('error');
       })
     );
 }

 update(adventureCalendar: AdventureCalendar) {

  const httpOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': 'application/json'
      }
  };
  return this.http.put<AdventureCalendar>(`${this.url}/${adventureCalendar.id}`, adventureCalendar, httpOptions).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError('AdventureCalendarService.update(): Error updating adventure calendar');
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
      return throwError('AdventureCalendarService.delete(): Error deleting adventure calendar');
    })
  );
}
}
