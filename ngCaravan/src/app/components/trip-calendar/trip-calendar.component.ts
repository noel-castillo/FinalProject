import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from './../../models/image';
import { TripCalendar } from './../../models/trip-calendar';
import { TripCalendarService } from 'src/app/services/trip-calendar.service';

@Component({
  selector: 'app-trip-calendar',
  templateUrl: './trip-calendar.component.html',
  styleUrls: ['./trip-calendar.component.css']
})
export class TripCalendarComponent implements OnInit {

  // F I E L D S

  title = 'ngTripCalendars';

  tripCalendars: TripCalendar[] = [];

  selected: TripCalendar = null;

  newTripCalendar: TripCalendar = new TripCalendar();

  editTripCalendar: TripCalendar = null;

  urlId = 0;

  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private tripCalSvc: TripCalendarService, private currentRoute: ActivatedRoute, private router: Router) { }

  // M E T H O D S

  ngOnInit() {

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.tripCalSvc.index().subscribe(
      data => {
        this.tripCalendars = data;
      },
      err => console.error('ngOnInit error in Trip Calendar Component')
    );
  }

  reload() {
    this.tripCalSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.tripCalendars = aGoodThingHappened;
      },
      (didntWork) => {
        console.error('Trip Calendar Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfTripCalendars() {
    return this.tripCalendars.length;
  }

  countTripCalendars(): number {
    return this.tripCalendars.length;
  }

  displayTripCalendar(tripCalendar) {
    this.selected = tripCalendar;
  }

  displayTable() {
    this.selected = null;
  }

  addTripCalendar() {
    this.tripCalSvc.createTripCalendar(this.newTripCalendar).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newTripCalendar = new TripCalendar();
        this.reload();
      },
      (didntWork) => {
        console.error('Trip Calendar Component addTripCalendar() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditTripCalendar(tripCalendar: TripCalendar) {
    this.editTripCalendar = Object.assign({}, this.selected);
  }

  updateTripCalendar(tripCalendar: TripCalendar) {
    this.tripCalSvc.updateTripCalendar(tripCalendar).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editTripCalendar = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error('Trip Calendar Component updateTripCalendar(tripCalendar) DID NOT WORK');
        this.reload();
      }

    );
  }

  deleteTripCalendar(id) {
    this.tripCalSvc.deleteTripCalendar(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error('Trip Calendar Component deleteTripCalendar(id) DID NOT WORK');
        this.reload();
      }

    );
  }

}
