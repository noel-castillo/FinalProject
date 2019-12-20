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

  trip: Trip = new Trip();
  vehicles: Vehicle[] = [];
  editTrip: Trip = null;
  createDepartAddress = new Address();
  editDepartAddress = null;
  createDestinationAddress = new Address();
  editDestinationAddress = new Address();
  tripVehicle: Vehicle = new Vehicle();

  // C o n s t r u c t o r
  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private tripSvc: TripService, private vehicleSvc: VehicleService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.auth.login('shaun', 'wombat1').subscribe(
      data => {
        console.log('Logged in');
        this.router.navigateByUrl('trips');
      },
      err => {
        console.error('Error logging in.');
        console.error(err);
      }
    );
  }
}
