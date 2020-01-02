import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Adventure } from 'src/app/models/adventure';
import { Trip } from 'src/app/models/trip';
import { AdventureService } from 'src/app/services/adventure.service';
import { TripService } from 'src/app/services/trip.service';

declare var jQuery: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  // F i e l d s

  trips: Trip[] = [];
  adventures: Adventure[] = [];
  types: string[] = ['trips', 'adventures'];
  searchNum: string;
  searchTrips = 'trips';
  searchAdventures = 'adventures';

  // C o n s t r u c t o r

  constructor(
    private tripSvc: TripService,
    private adventureSvc: AdventureService
  ) {}

  // M E T H O D S

  search(form: NgForm) {

  }

  ngOnInit() {
    this.trips = null;
    this.adventures = null;

  }
}
