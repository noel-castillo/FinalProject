import { AdventureCalendarService } from './../../services/adventure-calendar.service';
import { AdventureCalendar } from './../../models/adventure-calendar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adventure-calendar',
  templateUrl: './adventure-calendar.component.html',
  styleUrls: ['./adventure-calendar.component.css']
})
export class AdventureCalendarComponent implements OnInit {

  // F I E L D S

  selected: AdventureCalendar = null;

  adventureCalendars: AdventureCalendar[] = [];

  newAdventureCalendar: AdventureCalendar = new AdventureCalendar();

  editAdventureCalendar: AdventureCalendar = null;



  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private aSvc: AdventureCalendarService, private auth: AuthService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.aSvc.index().subscribe(
      data => {
        this.adventureCalendars = data;
      },
      err => console.error('ngOnInit error in Adventure Calendar Component')
    );
  }

  reload() {
    this.aSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.adventureCalendars = aGoodThingHappened;
      },
      (didntWork) => {
        console.error('Adventure Calendar Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfAdventureCalendars() {
    return this.adventureCalendars.length;
  }

  countAdventureCalendars(): number {
    return this.adventureCalendars.length;
  }

  displayAdventureCalendar(adventureCalendar) {
    this.selected = adventureCalendar;
  }

  displayTable() {
    this.selected = null;
  }

  addAdventureCalendar() {
    this.aSvc.create(this.newAdventureCalendar).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newAdventureCalendar = new AdventureCalendar();
        this.reload();
      },
      (didntWork) => {
        console.error('Adventure Calendar Component addTripCalendar() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditAdventureCalendar(adventureCalendar: AdventureCalendar) {
    this.editAdventureCalendar = Object.assign({}, this.selected);
  }

  updateAdventureCalendar(adventureCalendar: AdventureCalendar) {
    this.aSvc.update(adventureCalendar).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editAdventureCalendar = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error('Adventure Calendar Component updateTripCalendar(tripCalendar) DID NOT WORK');
        this.reload();
      }

    );
  }

  deleteAdventureCalendar(id) {
    this.aSvc.delete(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error('Adventure Calendar Component deleteAdventureCalendar(id) DID NOT WORK');
        this.reload();
      }

    );
  }



}
