import { TripService } from 'src/app/services/trip.service';
import { TripTravelerService } from './../../services/trip-traveler.service';
import { UserProfile } from './../../models/user-profile';
import { UserProfileService } from './../../services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { TripTraveler } from 'src/app/models/trip-traveler';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // F I E L D S
  currentProfile = new UserProfile();

  admin = false;

  trips: Trip[] = [];

  hostedTrips: Trip[] = [];

  selected: UserProfile = null;

  userProfiles: UserProfile[] = [];

  newUserProfile: UserProfile = new UserProfile();

  editUserProfile: UserProfile = null;

  newAddress: Address = new Address();

  newUser: User = new User();

  hostTripRequest: TripTraveler[] = [];

  tripRequest: TripTraveler[] = [];

  tripTraveler = false;

  // C O N S T R U C T O R

  constructor(
    private uSvc: UserProfileService,
    private auth: AuthService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private tripTravSvc: TripTravelerService,
    private tripSvc: TripService
  ) {}

  // M E T H O D S

  ngOnInit() {
    // this.auth.login('shaun', 'wombat1').subscribe(
    //   data => {
    //     console.log('Logged in');
    //     // this.router.navigateByUrl('user-profiles');
    //   },
    //   err => {
    //     console.error('Error logging in.');
    //     console.error(err);
    //   }
    // );

    // // grabs the array of todos from the service & adds it to this component
    // // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    // console.log(this.currentRoute.snapshot.paramMap.get('id'));
    // this.uSvc.index().subscribe(
    //   data => {
    //     this.userProfiles = data;
    //     console.log('Size of UserProfile****' + this.userProfiles.length);
    //   },
    //   err => console.error('ngOnInit error in UserProfile Component')
    // );

    this.uSvc.getUserInSessionProfile().subscribe(
      data => {
        this.currentProfile = data;
      },
      err => {
        console.log(err);
      }
    );

    this.tripSvc.index().subscribe(
      data => {
        this.trips = data;
        this.trips.forEach(trip => {
          if (trip.host.user.username === this.currentProfile.user.username) {
            this.hostedTrips.push(trip);
          }
        });
      },
      err => {
        console.log(err);
      }
    );

    this.tripTravSvc.index().subscribe(
      data => {
        this.tripRequest = data;
        this.tripRequest.forEach(req => {
          if (
            req.trip.host.user.username === this.currentProfile.user.username &&
            req.approved === false
          ) {
            this.hostTripRequest.push(req);
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  reload() {
    this.uSvc.index().subscribe(
      aGoodThingHappened => {
        console.log(aGoodThingHappened);
        this.userProfiles = aGoodThingHappened;
      },
      didntWork => {
        console.error('UserProfile Component reload() DID NOT WORK');
      }
    );
    this.tripTravSvc.getRequests().subscribe(
      data => {
        this.hostTripRequest.push(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  getNumOfUserProfiles() {
    return this.userProfiles.length;
  }

  getUserProfileById(id: number): UserProfile {
    for (let i = 0; i < this.userProfiles.length; i++) {
      if (this.userProfiles[i].id === id) {
        return this.userProfiles[i];
      }
    }
    return null;
  }

  getUserProfileByUser(user: User): UserProfile {
    for (let i = 0; i < this.userProfiles.length; i++) {
      if (this.userProfiles[i].user === user) {
        return this.userProfiles[i];
      }
    }
    return null;
  }

  countUserProfiles(): number {
    return this.userProfiles.length;
  }

  displayUserProfiles(userProfile) {
    this.selected = userProfile;
  }

  displayTable() {
    this.selected = null;
  }

  addUserProfile() {
    this.uSvc.create(this.newUserProfile).subscribe(
      aGoodThingHappened => {
        console.log(aGoodThingHappened);
        this.newUserProfile = new UserProfile();
        this.reload();
      },
      didntWork => {
        console.error('UserProfile Component addUserProfile() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditUserProfile(userPro: UserProfile) {
    this.editUserProfile = Object.assign({}, this.selected);
  }

  updateUserProfile(userPro: UserProfile) {
    this.uSvc.updateUserProfile(userPro).subscribe(
      aGoodThingHappened => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editUserProfile = null;
        this.selected = null;
      },
      didntWork => {
        console.error(
          'UserProfile Component updateUserProfile(userPro) DID NOT WORK'
        );
        this.reload();
      }
    );
  }

  deleteUserProfile(id) {
    this.uSvc.delete(id).subscribe(
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
