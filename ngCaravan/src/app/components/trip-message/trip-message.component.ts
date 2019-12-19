import { TripService } from './../../services/trip.service';
import { UserProfileService } from './../../services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TripMessage } from './../../models/trip-message';
import { TripMessageService } from './../../services/trip-message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-message',
  templateUrl: './trip-message.component.html',
  styleUrls: ['./trip-message.component.css']
})
export class TripMessageComponent implements OnInit {
  title = 'ngMessages';

  messages: TripMessage[] = [];

  selected: TripMessage = null;

  newMessage: TripMessage = new TripMessage();

  editMessage: TripMessage = null;

  urlId = 0;

  tripId = 2;

  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(
    private auth: AuthService,
    private usrSvc: UserProfileService,
    private tSvc: TripService,
    private tmSvc: TripMessageService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  // M E T H O D S

  ngOnInit() {
    this.auth.login('shaun', 'wombat1').subscribe(
      data => {
        console.log('Logged in');
      },
      err => {
        console.error('Error logging in.');
        console.error(err);
      }
    );

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.tmSvc.index(this.tripId).subscribe(
      data => {
        this.messages = data;
      },
      err => console.error('ngOnInit error in Address Component')
    );
  }

  reload() {
    this.tmSvc.index(this.tripId).subscribe(
      aGoodThingHappened => {
        console.log(aGoodThingHappened);
        this.messages = aGoodThingHappened;
      },
      didntWork => {
        console.error('Address Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfMessages() {
    return this.messages.length;
  }

  countMessage(): number {
    return this.messages.length;
  }

  displayMessage(messsage) {
    this.selected = messsage;
  }

  displayTable() {
    this.selected = null;
  }

  addMessage() {

    this.tmSvc.create(this.newMessage).subscribe(
      aGoodThingHappened => {
        console.log(aGoodThingHappened);
        this.newMessage = new TripMessage();
        this.reload();
      },
      didntWork => {
        console.error('Address Component addAddress() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditMessage(message: TripMessage) {
    this.editMessage = Object.assign({}, this.selected);
  }

  updateMessage(message: TripMessage) {
    this.tmSvc.updateTripMessage(message).subscribe(
      aGoodThingHappened => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editMessage = null;
        this.selected = null;
      },
      didntWork => {
        console.error('Address Component updateAddress(address) DID NOT WORK');
        this.reload();
      }
    );
  }

  deleteMessage(id) {
    this.tmSvc.delete(id).subscribe(
      aGoodThingHappened => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      didntWork => {
        console.error('Address Component deleteAddress(id) DID NOT WORK');
        this.reload();
      }
    );
  }
}
