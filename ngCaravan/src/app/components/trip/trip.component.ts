import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  // F i e l d s

  trips: Trip[] = [];
  vehicles: Vehicle[] = [];
  editTrip: Trip = null;
  createDepartAddress = null;
  editDepartAddress = null;
  createDestinationAddress = null;
  editDestinationAddress = null;

  // C o n s t r u c t o r
  constructor(private auth: AuthService, private tripSvc: TripService, private vehicleSvc: VehicleService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.auth.login('shaun', 'wombat1').subscribe(
      data => {
        console.log('Logged in');
        this.router.navigateByUrl('addresses');
      },
      err => {
        console.error('Error logging in.');
        console.error(err);
      }
    );

  // grabs the array of trips from the service & adds it to this component
  // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.tripSvc.index().subscribe(
        data => {
          this.trips = data;
        },
        err => {
          console.error('ngOnInit error in Address Component');
        }
    );
    this.vehicleSvc.getVehiclesByUser().subscribe(
      data => {
        this.vehicles = data;
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

    myNewTrip.departureAddress = form.value.departureAddress;
    myNewTrip.destinationAddress = form.value.destinationAddress;
    myNewTrip.description = form.value.description;
    myNewTrip.seatsAvailable = form.value.seatsAvailable;
    myNewTrip.cargoCapacity = form.value.cargoCapacity;
    myNewTrip.createDate = form.value.createDate;
    myNewTrip.totalCost = form.value.totalCost;
    myNewTrip.miles = form.value.miles;

    console.log(myNewTrip);
    this.tripSvc.create(myNewTrip).subscribe(
      data => {
        console.log(data);
        this.loadTrips();
      },
      err => {
        console.error(err);
      }
    );
  }

  updateTrip(trip: Trip) {
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
