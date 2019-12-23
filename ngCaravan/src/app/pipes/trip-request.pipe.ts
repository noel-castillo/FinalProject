import { Pipe, PipeTransform } from '@angular/core';
import { TripTraveler } from '../models/trip-traveler';

@Pipe({
  name: 'tripRequest'
})
export class TripRequestPipe implements PipeTransform {
  transform(request: TripTraveler): TripTraveler {
    if (request.approved === false && request.travelerStatus === 'pending') {
      return request;
    }
  }
}
