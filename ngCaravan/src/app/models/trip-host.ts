import { Trip } from './trip';
import { UserProfile } from './user-profile';
export class TripHost {
  // F I E L D S
  id: number;
  rating: number;
  review: string;
  trip: Trip;
  passenger: UserProfile;


  // C O N S T R U C T O R
  constructor(id?: number, rating?: number, review?: string, trip?: Trip, passenger?: UserProfile) {
    this.id = id;
    this.rating = rating;
    this.review = review;
    this.trip = trip;
    this.passenger = passenger;
  }
}
