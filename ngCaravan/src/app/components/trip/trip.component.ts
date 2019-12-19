import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  // F i e l d s

  trips: Trip[] = [];
  editTrip: Trip = null;


  // C o n s t r u c t o r
  constructor(private tripSvc: TripService) { }

  ngOnInit() {
    this.loadTrips();
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

  deleteRun(id: number) {
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
