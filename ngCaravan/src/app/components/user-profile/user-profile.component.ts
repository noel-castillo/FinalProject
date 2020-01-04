import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';
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
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // F I E L D S
  currentProfile: UserProfile = new UserProfile();

  admin = false;

  trips: Trip[] = [];

  hostedTrips: Trip[] = [];

  selected: UserProfile = null;

  userProfiles: UserProfile[] = [];

  newUserProfile: UserProfile = new UserProfile();

  editUserProfile: UserProfile = null;

  newAddress: Address = new Address();

  newUser: User = new User();

  newVehicle: Vehicle = new Vehicle();

  newImage: Image = new Image();

  hostTripRequest: TripTraveler[] = [];

  myTripRequests: TripTraveler[] = [];

  tripTraveler = false;

  seeVehicles = true;

  seePersonalInformation = true;

  seeBio = true;

  seeNewTrip = true;

  seeMyTrips = true;

  seePendingRequests = true;

  // C O N S T R U C T O R

  constructor(
    private uSvc: UserProfileService,
    private auth: AuthService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private tripTravSvc: TripTravelerService,
    private tripSvc: TripService,
    private vSvc: VehicleService
  ) { }

  // M E T H O D S


  showHosting() {
    this.seeNewTrip = true;

    this.seeMyTrips = true;

    this.seePendingRequests = true;

  }

  showAccountSettings() {
    this.seeVehicles = true;

    this.seePersonalInformation = true;

    this.seeBio = true;

  }

  addNewVehicle() {

    this.vSvc.create(this.newVehicle).subscribe(
      data => {
        console.log('Vehicle has been created!');
      },
      err => {
        console.log(err);
      }
    );

    this.uSvc.getUserInSessionProfile().subscribe(
      data => {
        this.currentProfile = data;
        this.currentProfile.vehicles.push(this.newVehicle);
        this.newVehicle = new Vehicle();
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteVehicle(vehicle: Vehicle) {

    this.vSvc.delete(vehicle.id).subscribe(
      data => {
        console.log('Vehicle has been deleted!');
        const index = this.currentProfile.vehicles.indexOf(vehicle);
        console.log(this.currentProfile.vehicles.splice(index, 1));
      },
      err => {
        console.log(err);
      }
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  updateProfileImage() {
    this.currentProfile.profilePic.url = this.newImage.url;
    this.updateUserProfile(this.currentProfile);
  }

  denyRequest(req: TripTraveler) {
    req.travelerStatus = 'Denied';
    this.tripTravSvc.updateTripTraveler(req);
  }

  approveRequest(req: TripTraveler) {
    req.travelerStatus = 'Approved';
    this.tripTravSvc.updateTripTraveler(req);
  }

  ngOnInit() {

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

    this.tripTravSvc.myTripRequests().subscribe(
      data => {
        console.log('loading requests');
        this.myTripRequests = data;
        console.log(data);
        // this.myTripRequests.forEach(req => {
        // if (req.travelerStatus === 'pending') {
        // this.hostTripRequest.push(req);
        // }
        // });
      },
      err => {
        console.log('User Profile Component: Unable to load myTripRequests');
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
    this.tripTravSvc.myTripRequests().subscribe(
      data => {
        this.myTripRequests = data;
        // this.myTripRequests.forEach(req => {
        //   if (req.travelerStatus === 'pending') {
        //     this.hostTripRequest.push(req);
        //   }
        // });
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
    this.userProfiles.forEach(prof => {
      if (prof.id === id) {
        return prof;
      }
    });

    return null;
  }

  getUserProfileByUser(user: User): UserProfile {
    this.userProfiles.forEach(prof => {
      if (prof.user === user) {
        return prof;
      }
    });

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

  denyTripTraveler(req: TripTraveler) {
    req.travelerStatus = 'denied';

    this.tripTravSvc.updateTripTraveler(req).subscribe(
      data => {
        this.reload();
        console.log('Success');
      },
      err => {
        console.log('Fail');
      }
    );
  }
  approveTripTraveler(req: TripTraveler) {
    req.travelerStatus = 'approved';
    console.log(req);
    this.tripTravSvc.updateTripTraveler(req).subscribe(
      data => {
        this.reload();
        console.log('Success');
      },
      err => {
        console.log('Fail');
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
