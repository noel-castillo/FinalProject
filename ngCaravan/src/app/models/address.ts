export class Address {

  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude: string;
  longitude: string;


  constructor(street?: string, city?: string, state?: string, zip?: string, latitude?: string, longitude?: string) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
