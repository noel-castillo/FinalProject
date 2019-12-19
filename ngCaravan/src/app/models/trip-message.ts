import { Trip } from './trip';
import { UserProfile } from './user-profile';

export class TripMessage {
  id: number;
  trip: Trip;
  userProfile: UserProfile;
  datePosted: string;
  content: string;

  constructor(
    id?: number,
    trip?: Trip,
    userProfile?: UserProfile,
    datePosted?: string,
    content?: string
  ) {
    this.id = id;
    this.trip = trip;
    this.userProfile = userProfile;
    this.datePosted = datePosted;
    this.content = content;
  }
}
