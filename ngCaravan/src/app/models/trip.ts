export class Trip {
  id: number;
  host: User;
  vehicle: Vehicle;
  departureAddress: Address ;
  destinationAddress: Address ;
  description: string;
  seatsAvailable: number;
  cargoCapacity: number;
  createDate: Date;
  enabled: boolean;
  totalCost: number;
  miles: number;


  // tslint:disable-next-line: max-line-length
  constructor(host?: User, departureAddress?: Address, destinationAddress?: Address, description?: string, seatsAvailable?: number, cargoCapactiy?: number, createDate?: Date, enabled?: boolean, totalCost?: number, miles?: number) {
    this.host = host;
    this.departureAddress = departureAddress;
    this.destinationAddress = destinationAddress;
    this.description = description;
    this.seatsAvailable = seatsAvailable;
    this.cargoCapacity = cargoCapactiy;
    this.createDate = createDate;
    this.enabled = enabled;
    this.totalCost = totalCost;
    this.miles = miles;
  }
}
