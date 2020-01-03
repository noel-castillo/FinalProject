import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventureTraveler } from 'src/app/models/adventure-traveler';
import { AdventureTravelerService } from 'src/app/services/adventure-traveler.service';
import { AuthService } from 'src/app/services/auth.service';
import { TripTraveler } from './../../models/trip-traveler';

@Component({
  selector: 'app-adventure-traveler',
  templateUrl: './adventure-traveler.component.html',
  styleUrls: ['./adventure-traveler.component.css']
})
export class AdventureTravelerComponent implements OnInit {

 // F I E L D S

 title = 'ngAdventureTraveler';

 adventureTravelers: AdventureTraveler[] = [];

 tid: number;

 selected: AdventureTraveler = null;

 newAdventureTraveler: AdventureTraveler = new AdventureTraveler();

 editAdventureTraveler: AdventureTraveler = null;

 urlId = 0;

 // C O N S T R U C T O R

 // tslint:disable-next-line: max-line-length
 constructor(private auth: AuthService, private adventureTravelerSvc: AdventureTravelerService, private currentRoute: ActivatedRoute, private router: Router) { }

 // M E T H O D S

 ngOnInit() {

   // grabs the array of todos from the service & adds it to this component
   // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
   console.log(this.currentRoute.snapshot.paramMap.get('id'));
   this.adventureTravelerSvc.index().subscribe(
     data => {
       this.adventureTravelers = data;
     },
     err => console.error('ngOnInit error in Adventure Traveler Component')
   );
 }

 reload() {
   this.adventureTravelerSvc.index().subscribe(
     (aGoodThingHappened) => {
       console.log(aGoodThingHappened);
       this.adventureTravelers = aGoodThingHappened;
     },
     (didntWork) => {
       console.error('Adventure Traveler Component reload() DID NOT WORK');
     }
   );
 }

 getNumOfAdventureTravelers() {
   return this.adventureTravelers.length;
 }

 countAdventureTravelers(): number {
   return this.adventureTravelers.length;
 }

 displayAdventureTraveler(adventureTraveler) {
   this.selected = adventureTraveler;
 }

 displayTable() {
   this.selected = null;
 }

 addAdventureTraveler() {
   this.newAdventureTraveler.approved = false;
   this.newAdventureTraveler.attended = false;

   this.adventureTravelerSvc.createAdventureTraveler(this.newAdventureTraveler, this.tid).subscribe(
     (aGoodThingHappened) => {
       console.log(aGoodThingHappened);
       this.newAdventureTraveler = new AdventureTraveler();
       this.reload();
     },
     (didntWork) => {
       console.error('Adventure Traveler Component addAdventureTraveler() DID NOT WORK');
       this.reload();
     }
   );
 }

 setEditAdventureTraveler() {
   this.editAdventureTraveler = Object.assign({}, this.selected);
 }

 updateAdventureTraveler(adventureTraveler: AdventureTraveler) {
   this.adventureTravelerSvc.updateAdventureTraveler(adventureTraveler).subscribe(
     (aGoodThingHappened) => {
       console.log(aGoodThingHappened);
       this.reload();
       this.editAdventureTraveler = null;
       this.selected = null;
     },
     (didntWork) => {
       console.error('Adventure Traveler Component updateTripTraveler(tripTraveler) DID NOT WORK');
       this.reload();
     }

   );
 }

 deleteAdventureTraveler(id) {
   this.adventureTravelerSvc.deleteAdventureTraveler(id).subscribe(
     (aGoodThingHappened) => {
       console.log(aGoodThingHappened);
       this.reload();
     },
     (didntWork) => {
       console.error('Adventure Traveler Component deleteAdventureTraveler(id) DID NOT WORK');
       this.reload();
     }

   );
 }

}
