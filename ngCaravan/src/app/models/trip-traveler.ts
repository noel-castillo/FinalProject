import { UserProfile } from './user-profile';
import { Trip } from './trip';
import { User } from './user';

export class TripTraveler {

  id: number;
  rating: number;
  review: string;
  contributionPledge: number;
  contributionActual: number;
  attended: boolean;
  trip: Trip;
  user: UserProfile;

  // tslint:disable-next-line: max-line-length
  constructor(id?: number, rating?: number, review?: string, contributionPledge?: number, contributionActual?: number, attended?: boolean, trip?: Trip, user?: UserProfile) {

    this.id = id;
    this.rating = rating;
    this.review = review;
    this.contributionPledge = contributionPledge;
    this.contributionActual = contributionActual;
    this.attended = attended;
    this.trip = trip;
    this.user = user;
  }
}
