import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Adventure } from 'src/app/models/adventure';
import { Trip } from 'src/app/models/trip';
import { AdventureService } from 'src/app/services/adventure.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  // F i e l d s

  trips: Trip[] = [];
  trips2: Trip[] = [];
  adventures: Adventure[] = [];
  types: string[] = ['trips', 'adventures'];
  searchNum: string;
  searchTrips = 'trips';
  searchAdventures = 'adventures';
  searchResult = false;

  // C o n s t r u c t o r

  constructor(
    private tripSvc: TripService,
    private adventureSvc: AdventureService,
    private route: Router
  ) {}

  // M E T H O D S

  ngOnInit() {
    this.searchResult = false;
    this.trips = null;
    this.adventures = null;
    this.tripSvc.index().subscribe(
      data => {
        this.trips2 = data;
      },
      err => {
        console.error('Search Results Component: Unable to retrieve trips');
      }
    );
  }

  search(form: NgForm) {
    console.log('hi');
    console.log(this.trips2.length);
    console.log(this.trips2);
    console.log(form.value.currCity);
    console.log(form.value.currState);
    console.log(form.value.destCity);
    console.log(form.value.destState);
    console.log('goodbye');
    this.trips = [];

    this.tripSvc.index().subscribe(
      data => {
        this.trips2 = data;
      },
      err => {
        console.error('Search Results Component: Unable to retrieve trips');
      }
    );

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.trips2.length; i++) {
      if (
        this.trips2[i].destinationAddress.state === form.value.destState ||
        this.trips2[i].departureAddress.state === form.value.destState
      ) {
        this.trips.push(this.trips2[i]);
      }
    }
    if (this.trips.length === 0) {
      this.route.navigateByUrl('notfound');
    }
  }
}
