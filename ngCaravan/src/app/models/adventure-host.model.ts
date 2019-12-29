import { User } from './user';
import { Adventure } from './adventure';

export class AdventureHost {

  // F I E L D S

  id: number;
  rating: number;
  review: string;
  user: User;
  adventure: Adventure;


  // C O N S T R U C T O R

  constructor(id?: number, rating?: number, review?: string,
              user?: User, adventure?: Adventure) {
      this.id = id;
      this.rating = rating;
      this.review = review;
      this.user = user;
      this.adventure = adventure;
  }



}
