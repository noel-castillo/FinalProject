import { TripCalendar } from './../../models/trip-calendar';
import { ImageService } from 'src/app/services/image.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { Vehicle } from 'src/app/models/vehicle';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Address } from 'src/app/models/address';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  // F i e l d s
  new = false;
  trips: Trip[] = [];
  vehicles: Vehicle[] = [];
  editTrip: Trip = null;
  createDepartAddress = new Address();
  editDepartAddress = null;
  createDestinationAddress = new Address();
  editDestinationAddress = new Address();
  tripVehicle: Vehicle = new Vehicle();

  // C o n s t r u c t o r
  // tslint:disable-next-line: max-line-length
  constructor(
    private auth: AuthService,
    private tripSvc: TripService,
    private vehicleSvc: VehicleService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // grabs the array of trips from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.tripSvc.index().subscribe(
      data => {
        this.trips = data;
        console.log(this.trips);
      },
      err => {
        console.error('ngOnInit error in Address Component');
      }
    );
    this.vehicleSvc.getVehiclesByUser().subscribe(
      data => {
        this.vehicles = data;
        console.log('in trip init');
        console.log(this.vehicles);
      },
      err => {
        console.error('Error getting vehicle list');
      }
    );
  }

  loadTrips() {
    this.tripSvc.index().subscribe(
      data => {
        console.log(data);
        this.trips = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  addTrip(form: NgForm) {
    const myNewTrip = new Trip();

    const myNewCalendar = new TripCalendar();
    myNewCalendar.startDate = form.value.startDate;
    myNewCalendar.endDate = form.value.endDate;

    const myNewDestAddress = new Address();
    myNewDestAddress.street = form.value.destinationAddressStreet;
    myNewDestAddress.city = form.value.destinationAddressCity;
    myNewDestAddress.state = form.value.destinationAddressState;
    myNewDestAddress.zip = form.value.destinationAddressZip;

    const myNewDepartAddress = new Address();
    myNewDepartAddress.street = form.value.departureAddressStreet;
    myNewDepartAddress.city = form.value.departureAddressCity;
    myNewDepartAddress.state = form.value.departureAddressState;
    myNewDepartAddress.zip = form.value.departureAddressZip;

    myNewTrip.tripCalendar = myNewCalendar;
    myNewTrip.departureAddress = myNewDepartAddress;
    myNewTrip.destinationAddress = myNewDestAddress;
    myNewTrip.description = form.value.description;
    myNewTrip.seatsAvailable = form.value.seatsAvailable;
    myNewTrip.cargoCapacity = form.value.cargoCapacity;
    myNewTrip.createDate = form.value.createDate;
    myNewTrip.totalCost = form.value.totalCost;
    myNewTrip.miles = form.value.miles;

    myNewTrip.vehicle = this.tripVehicle;

    console.log(myNewTrip);
    this.tripSvc.create(myNewTrip).subscribe(
      data => {
        console.log(data);
        this.tripVehicle = null;
        this.loadTrips();
      },
      err => {
        console.error(err);
      }
    );
  }

  updateTrip(trip: Trip) {
    console.log('in trip.ts updateTrip()');
    console.log(trip);
    this.tripSvc.update(trip).subscribe(
      data => {
        this.loadTrips();
        this.editTrip = null;
      },
      err => {
        console.error('TripComponenent.updateTrip(): error updating trip');
        console.error(err);
      }
    );
  }

  disableTrip(trip: Trip) {
    console.log(trip);
    trip.enabled = false;
    this.tripSvc.disable(trip).subscribe(
      data => {
        this.loadTrips();
        this.editTrip = null;
      },
      err => {
        console.error('TripComponenent.disableTrip(): error disabling trip');
        console.error(err);
      }
    );
  }

  deleteTrip(id: number) {
    this.tripSvc.delete(id).subscribe(
      data => {
        this.loadTrips();
        this.editTrip = null;
      },
      error => {
        console.error('TripComponenent.deleteTrip(): error deleting trip');
        console.error(error);
      }
    );
  }
}
