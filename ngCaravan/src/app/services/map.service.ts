import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // F I E L D S

  private key = 'AIzaSyAXNWapNHF-MKPHz5LedecBmta9UxCIAGo';

  private gmapsUrl = 'https://www.google.com/maps/embed/v1/directions?key=';

  private gmapsInfoUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin=';

  builtUrl = '';

  private tripBuilt;



  // C O N S T R U C T O R

  constructor(private http: HttpClient) { }



  // M E T H O D S

  // Required URL
  // https://www.google.com/maps/embed/v1/directions
  // ?key=YOUR_API_KEY
  // &origin=Oslo+Norway
  // &destination=Telemark+Norway
  // &avoid=tolls|highways

  // https://maps.googleapis.com/maps/api/directions
  // /json?origin=Dallas&destination=Norman
  // &key=AIzaSyAXNWapNHF-MKPHz5LedecBmta9UxCIAGo

  getRoute(trip: Trip) {
    console.log('**in MAP SERVICE**' + trip.departureAddress);
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.gmapsUrl + this.key + '&origin=' + trip.departureAddress.city + '+' + trip.departureAddress.state + '&destination=' + trip.destinationAddress.state + '+' + trip.destinationAddress.city).pipe(map(
      (response: Response) => response));
  }

  buildRouteUrl(trip: Trip) {


      console.log('**in MAP BUILDER SERVICE**' + trip.departureAddress);



    // tslint:disable-next-line: max-line-length
      return this.builtUrl = this.gmapsUrl + this.key + '&origin=' + trip.departureAddress.city + '+' + trip.departureAddress.state + '&destination=' + trip.destinationAddress.state + '+' + trip.destinationAddress.city;

  }

  getRouteDetails(trip: Trip) {

    // this.getRouteDetails(trip).subscribe(
    //   data => {
    //     this.tripBuilt = data;
    //     console.log('**TRIP STUFF**' + this.tripBuilt);
    //   },
    //   error => {
    //     console.log('Error Getting route Details' + error);
    //   }
    // );

    // tslint:disable-next-line: max-line-length
    return this.http.get(this.gmapsInfoUrl + trip.departureAddress.city + '&destination=' + trip.destinationAddress.city + '&key=' + this.key).pipe(map(
      (response: Response) => response));
  }


}
