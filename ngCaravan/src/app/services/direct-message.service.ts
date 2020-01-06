import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TripTraveler } from '../models/trip-traveler';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DirectMessage } from '../models/direct-message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectMessageService {

   // F i e l d s
   private baseUrl = environment.baseUrl;
   private url = this.baseUrl + 'api/directMessages';

   // C o n s t r u c t o r

   constructor(private http: HttpClient, private authService: AuthService) {}

   // M e t h o d s

   index() {
     const credentials = this.authService.getCredentials();
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       })
     };
     return this.http.get<DirectMessage[]>(this.url, httpOptions).pipe(
       catchError((err: any) => {
         console.log(err);
         return throwError('Direct Message Service unable to run index()');
       })
     );
   }
   getMessages() {
     const credentials = this.authService.getCredentials();
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       })
     };

     return this.http
       .get<DirectMessage[]>(this.url + '/inbox', httpOptions)
       .pipe(
         catchError((err: any) => {
           console.log(err);
           return throwError('Direct Message Service unable to run getMessages()');
         })
       );
   }
   createDirectMessage(newDirectMessage: DirectMessage, fid: number) {
     const credentials = this.authService.getCredentials();
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       })
     };

     // tslint:disable-next-line: max-line-length
     return this.http
       .post<DirectMessage>(
         this.url + '/' + fid,
         newDirectMessage,
         httpOptions
       )
       .pipe(
         catchError((err: any) => {
           console.log(err);
           return throwError('Direct Message Service unable to run createDirectMessage()');
         })
       );
   }

   updateDirectMessage(directMessage: DirectMessage) {
     const credentials = this.authService.getCredentials();
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       })
     };
     return this.http
       .put<DirectMessage>(
         `${this.url}/${directMessage.id}`,
         directMessage,
         httpOptions
       )
       .pipe(
         catchError((err: any) => {
           console.error(err);
           return throwError('DirectMessage.update(): Error updating direct message');
         })
       );
   }

   deleteDirectMessage(id: number) {
     const credentials = this.authService.getCredentials();
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       })
     };
     return this.http.delete(`${this.url}/${id}`, httpOptions).pipe(
       catchError((err: any) => {
         console.error(err);
         return throwError('Direct Message Service delete(): Error deleting message');
       })
     );
   }

}
