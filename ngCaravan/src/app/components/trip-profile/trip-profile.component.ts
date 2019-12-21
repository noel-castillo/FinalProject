import { TripHost } from 'src/app/models/trip-host';
import { UserProfile } from './../../models/user-profile';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Trip } from 'src/app/models/trip';
import { Vehicle } from 'src/app/models/vehicle';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-trip-profile',
  templateUrl: './trip-profile.component.html',
  styleUrls: ['./trip-profile.component.css']
})
export class TripProfileComponent implements OnInit {

  // F i e l d s

  tripHost: UserProfile = null;

  trip: Trip = new Trip();
  trips: Trip[] = [];
  vehicles: Vehicle[] = [];
  editTrip: Trip = null;
  createDepartAddress = new Address();
  editDepartAddress = null;
  createDestinationAddress = new Address();
  editDestinationAddress = new Address();
  tripVehicle: Vehicle = new Vehicle();
  selected: Trip = null;

  // C o n s t r u c t o r
  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private tripSvc: TripService, private vehicleSvc: VehicleService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

     // grabs the array of trips from the service & adds it to this component
  // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.tripSvc.index().subscribe(
        data => {
          this.trips = data;
          this.trips[0].host = this.tripHost;
        },
        err => {
          console.error('ngOnInit error in Trip Profile Component');
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

  displayTripProfiles(tripProfile) {
    this.selected = tripProfile;
  }

  // disableTrip(trip: Trip) {
  //   console.log(trip);
  //   trip.enabled = false;
  //   this.tripSvc.disable(trip).subscribe(
  //     data => {
  //       this.loadTrips();
  //       this.editTrip = null;
  //     },
  //     err => {
  //       console.error('TripComponenent.disableTrip(): error disabling trip');
  //       console.error(err);
  //     }
  //   );
  // }




}
