import { Trip } from './trip';

export class TripTraveler {

  id: number;
  rating: number;
  review: string;
  contributionPledge: number;
  contributionActual: number;
  attended: boolean;
  trip: Trip;
  user: User;

  // tslint:disable-next-line: max-line-length
  constructor(id?: number, rating?: number, review?: string, contributionPledge?: number, contributionActual?: number, attended?: boolean, trip?: Trip, user?: User) {

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
