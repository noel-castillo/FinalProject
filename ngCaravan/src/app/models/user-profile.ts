import { Image } from './image';
import { Vehicle } from './vehicle';
import { Address } from './address';
import { User } from './user';

export class UserProfile {

  // F I E L D S
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phone: string;
  mileagePoints: number;
  registrationDate: Date;
  profilePic: Image;
  address: Address;
  user: User;
  vehicles: Vehicle[];


  // C O N S T R U C T O R
  constructor(id?: number, firstName?: string, lastName?: string, email?: string, bio?: string,
              phone?: string, mileagePoints?: number, registrationDate?: Date, profilePic?: Image,
              address?: Address, user?: User, vehicles?: Vehicle[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.bio = bio;
    this.phone = phone;
    this.mileagePoints = mileagePoints;
    this.registrationDate = registrationDate;
    this.profilePic = profilePic;
    this.address = address;
    this.user = user;
    this.vehicles = vehicles;
  }
}
