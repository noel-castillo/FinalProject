import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TripTravelerService } from 'src/app/services/trip-traveler.service';
import { TripTraveler } from './../../models/trip-traveler';

@Component({
  selector: 'app-trip-traveler',
  templateUrl: './trip-traveler.component.html',
  styleUrls: ['./trip-traveler.component.css']
})
export class TripTravelerComponent implements OnInit {
  // F I E L D S

  title = 'ngTripTraveler';

  tripTravelers: TripTraveler[] = [];


  selected: TripTraveler = null;

  newTripTraveler: TripTraveler = new TripTraveler();

  editTripTraveler: TripTraveler = null;

  urlId = 0;

  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private tripTravelerSvc: TripTravelerService, private currentRoute: ActivatedRoute, private router: Router) { }

  // M E T H O D S

  ngOnInit() {

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.tripTravelerSvc.index().subscribe(
      data => {
        this.tripTravelers = data;
      },
      err => console.error('ngOnInit error in Trip Traveler Component')
    );
  }

  reload() {
    this.tripTravelerSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.tripTravelers = aGoodThingHappened;
      },
      (didntWork) => {
        console.error('Trip Traveler Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfTripTravelers() {
    return this.tripTravelers.length;
  }

  countTripTravelers(): number {
    return this.tripTravelers.length;
  }

  displayTripTraveler(tripTraveler) {
    this.selected = tripTraveler;
  }

  displayTable() {
    this.selected = null;
  }

  addTripTraveler() {
    this.tripTravelerSvc.createTripTraveler(this.newTripTraveler).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newTripTraveler = new TripTraveler();
        this.reload();
      },
      (didntWork) => {
        console.error('Trip Traveler Component addTripTraveler() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditTripTraveler(tripTraveler: TripTraveler) {
    this.editTripTraveler = Object.assign({}, this.selected);
  }

  updateTripTraveler(tripTraveler: TripTraveler) {
    this.tripTravelerSvc.updateTripTraveler(tripTraveler).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editTripTraveler = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error('Trip Traveler Component updateTripTraveler(tripTraveler) DID NOT WORK');
        this.reload();
      }

    );
  }

  deleteTripTraveler(id) {
    this.tripTravelerSvc.deleteTripTraveler(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error('Trip Traveler Component deleteTripTraveler(id) DID NOT WORK');
        this.reload();
      }

    );
  }

}
