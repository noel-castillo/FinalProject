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

  builtUrl = '';



  // C O N S T R U C T O R

  constructor(private http: HttpClient) { }



  // M E T H O D S

  // Required URL
  // https://www.google.com/maps/embed/v1/directions
  // ?key=YOUR_API_KEY
  // &origin=Oslo+Norway
  // &destination=Telemark+Norway
  // &avoid=tolls|highways

  getRoute(trip: Trip) {
    console.log('**in MAP SERVICE**' + trip.departureAddress);
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.gmapsUrl + this.key + '&origin=' + trip.departureAddress.city + '+' + trip.departureAddress.state + '&destination=' + trip.destinationAddress.state + '+' + trip.destinationAddress.city).pipe(map(
      (response: Response) => response));
  }

  buildRouteUrl(trip: Trip) {
    console.log('**in MAP BUILDER SERVICE**' + trip.departureAddress);
    // tslint:disable-next-line: max-line-length

    // tslint:disable-next-line: max-line-length
    return this.builtUrl = this.gmapsUrl + this.key + '&origin=' + trip.departureAddress.city + '+' + trip.departureAddress.state + '&destination=' + trip.destinationAddress.state + '+' + trip.destinationAddress.city;

  }


}
