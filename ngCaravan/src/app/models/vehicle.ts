import { UserProfile } from './user-profile';
import { User } from './user';

export class Vehicle {
  // F I E L D S
  id: number;
  make: string;
  model: string;
  manufactureYear: number;
  capacity: number;
  seatsAvailable: number;
  interiorDescription: string;
  userProfile: UserProfile;
  enabled: boolean;
  imageURL: string;


  // C O N S T R U C T O R
  constructor(id?: number, make?: string, model?: string, manufactureYear?: number, capacity?: number,
              seatsAvailable?: number, interiorDescription?: string, userProfile?: UserProfile, enabled?: boolean, imageURL?: string) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.manufactureYear = manufactureYear;
    this.capacity = capacity;
    this.seatsAvailable = seatsAvailable;
    this.interiorDescription = interiorDescription;
    this.userProfile = userProfile;
    this.enabled = enabled;
    this.imageURL = imageURL;
  }

}
