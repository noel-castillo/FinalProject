import { Trip } from './trip';

export class TripCalendar {
  id: number;
  trip: Trip;
  startDate: Date;
  endDate: Date;

  constructor(trip?: Trip, startDate?: Date, endDate?: Date) {
    this.trip = trip;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
