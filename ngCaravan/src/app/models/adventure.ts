import { Address } from 'cluster';

export class Adventure {
  id: number;
  title: string;
  description: string;
  activityLvl: string;
  includes: string;
  price: number;
  enabled: boolean;
  itinerary: string;
  address: Address;
  host: User;

  constructor(
  id: number,
  title: string,
  description: string,
  activityLvl: string,
  includes: string,
  price: number,
  enabled: boolean,
  itinerary: string,
  address: Address,
  host: User
  ){
  this.id = id,
  this.title = title;
  this.description = description,
  this.activityLvl = activityLvl,
  this.includes = includes,
  this.price = price,
  this.enabled = enabled,
  this.itinerary = itinerary,
  this.address = address,
  this.host = host

  }
}
