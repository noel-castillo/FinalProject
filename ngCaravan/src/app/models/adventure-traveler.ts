import { Adventure } from 'src/app/models/adventure';
import { UserProfile } from './user-profile';

export class AdventureTraveler {

  id: number;
  rating: number;
  review: string;
  attended: boolean;
  adventure: Adventure;
  user: UserProfile;
  status: string;

  // tslint:disable-next-line: max-line-length
  constructor(id?: number, rating?: number, review?: string, attended?: boolean, adventure?: Adventure, user?: UserProfile, status?: string) {

    this.id = id;
    this.rating = rating;
    this.review = review;
    this.attended = attended;
    this.adventure = adventure;
    this.user = user;
    this.status = status;
  }
}
