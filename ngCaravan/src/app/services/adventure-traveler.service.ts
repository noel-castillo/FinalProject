import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TripTravelerService } from 'src/app/services/trip-traveler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AdventureTraveler } from '../models/adventure-traveler';
import { TripTraveler } from '../models/trip-traveler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdventureTravelerService {

   // F i e l d s
   private baseUrl = environment.baseUrl;
   private url = this.baseUrl + 'api/adventureTravelers';

   // C o n s t r u c t o r

   constructor(private http: HttpClient, private authService: AuthService) { }

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
     return this.http.get<AdventureTraveler[]>(this.url, httpOptions)
       .pipe(
         catchError((err: any) => {
           console.log(err);
           return throwError('error');
         })
       );
   }
 getRequests() {
   const credentials = this.authService.getCredentials();
   const httpOptions = {
     headers: new HttpHeaders({
       Authorization: `Basic ${credentials}`,
       'Content-Type': 'application/json',
       'X-Requested-With': 'XMLHttpRequest'
     })
   };

   return this.http.get<AdventureTraveler>(this.baseUrl + '/tripHostTravelers', httpOptions)
     .pipe(
       catchError((err: any) => {
         console.log(err);
         return throwError('error');
       })
     );
 }
   createAdventureTraveler(newAdventureTraveler: AdventureTraveler, tid: number) {

     const credentials = this.authService.getCredentials();
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       })
     };

     // tslint:disable-next-line: max-line-length
     return this.http.post<AdventureTraveler>(this.baseUrl + 'api/adventures/' + tid + '/adventureTravelers', newAdventureTraveler, httpOptions)
       .pipe(
         catchError((err: any) => {
           console.log(err);
           return throwError('error');
         })
       );
   }

   updateAdventureTraveler(adventureTraveler: AdventureTraveler) {

     const credentials = this.authService.getCredentials();
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest'
       })
     };
     return this.http.put<AdventureTraveler>(`${this.url}/${adventureTraveler.id}`, adventureTraveler, httpOptions).pipe(
       catchError((err: any) => {
         console.error(err);
         return throwError('Adventure Traveler Service update(): Error updating adventure traveler');
       })
     );
   }

   deleteAdventureTraveler(id: number) {
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
         return throwError('Adventure Traveler Service delete(): Error deleting adventure traveler');
       })
     );
   }

}
