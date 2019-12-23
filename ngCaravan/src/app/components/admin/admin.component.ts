import { Component, OnInit } from '@angular/core';
import { TripHost } from 'src/app/models/trip-host';
import { UserProfile } from 'src/app/models/user-profile';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  reviews: TripHost[] = [];
  selectedReview: TripHost;
  new = false;
  editReview: TripHost = null;
  currentUser: UserProfile;
  admin = false;

  constructor() { }

  ngOnInit() {
  }

}
