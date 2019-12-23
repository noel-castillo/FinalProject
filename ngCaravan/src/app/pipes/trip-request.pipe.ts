import { TripTraveler } from 'src/app/models/trip-traveler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripRequest'
})
export class TripRequestPipe implements PipeTransform {
  transform(request: TripTraveler): TripTraveler {
    if (request.approved === false && request.status === 'pending') {
      return request;
    }
  }
}
