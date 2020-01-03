import { Image } from './image';
import { Vehicle } from './vehicle';
import { Address } from './address';
import { User } from './user';
import { DirectMessage } from './direct-message';

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
  inbox: DirectMessage[];
  outbox: DirectMessage[];
  messages: DirectMessage[];
  sorted: DirectMessage[] = [];


  // C O N S T R U C T O R
  constructor(id?: number, firstName?: string, lastName?: string, email?: string, bio?: string,
              phone?: string, mileagePoints?: number, registrationDate?: Date, profilePic?: Image,
              address?: Address, user?: User, vehicles?: Vehicle[], inbox?: DirectMessage[], outbox?: DirectMessage[],
              messages?: DirectMessage[]) {
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
    this.inbox = inbox;
    this.outbox = outbox;
    this.messages = messages;
  }

  // M E T H O D S

  getAllMessages() {
    this.inbox.forEach((message) => {
      this.messages.push(message);
    });

    this.outbox.forEach((message) => {
      this.messages.push(message);
    });
    const sortedMessages = this.messages.sort((a, b) => b.datePosted.valueOf() - a.datePosted.valueOf());
    this.sorted = sortedMessages;
    return sortedMessages;
  }
}
