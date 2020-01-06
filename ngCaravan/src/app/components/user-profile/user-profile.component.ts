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
import { NgForm } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { TripCalendar } from 'src/app/models/trip-calendar';

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

  myHostings: Trip[] = [];

  myTrips: TripTraveler[] = [];

  selected: UserProfile = null;

  userProfiles: UserProfile[] = [];

  newUserProfile: UserProfile = new UserProfile();

  editUserProfile: UserProfile = null;

  editVehicle: Vehicle = null;

  editHosting: Trip = null;

  newAddress: Address = new Address();

  newUser: User = new User();

  newVehicle: Vehicle = new Vehicle();

  newImage: Image = new Image();

  newTrip: Trip = new Trip();

  newTripCalendar: TripCalendar = new TripCalendar();

  hostTripRequest: TripTraveler[] = [];

  myTripRequests: TripTraveler[] = [];

  tripTraveler = false;

  seeVehicles = true;

  seePersonalInformation = true;

  seeMyTrips = true;

  seeNewTrip = true;

  seeNewVehicle = true;

  seeMyHostings = true;

  seePendingRequests = true;

  seeEditPersonalInformation = true;

  selectedTrip: Trip = null;

  // C O N S T R U C T O R

  constructor(
    private uSvc: UserProfileService,
    private auth: AuthService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private tripTravSvc: TripTravelerService,
    private tripSvc: TripService,
    private addrSvc: AddressService,
    private vSvc: VehicleService
  ) {}

  // M E T H O D S

  showHosting() {
    this.seeNewTrip = true;

    this.seeMyHostings = true;

    this.seePendingRequests = true;

    this.selectedTrip = null;

    this.newTrip.departureAddress = new Address();
    this.newTrip.destinationAddress = new Address();
    this.newTrip.tripCalendar = new TripCalendar();
  }

  hideHosting() {
    this.seeNewTrip = false;

    this.seeMyHostings = false;

    this.seePendingRequests = false;

    this.selectedTrip = null;

    this.newTrip.departureAddress = new Address();
    this.newTrip.destinationAddress = new Address();
    this.newTrip.tripCalendar = new TripCalendar();
  }

  showAccountSettings() {
    this.seeVehicles = true;

    this.seeMyTrips = true;

    this.seePersonalInformation = true;

    this.seeEditPersonalInformation = true;
  }

  hideAccountSettings() {
    this.seeVehicles = false;

    this.seeMyTrips = false;

    this.seePersonalInformation = true;

    this.seeEditPersonalInformation = true;
  }

  addNewVehicle() {
    this.vSvc.create(this.newVehicle).subscribe(
      data => {
        console.log('Vehicle has been created!');
        this.newVehicle = new Vehicle();
        this.seeNewVehicle = true;
        this.currentProfile.vehicles.push(this.newVehicle);
      },
      err => {
        console.log(err);
      }
    );

    this.uSvc.getUserInSessionProfile().subscribe(
      data => {
        this.currentProfile = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  createTrip() {
    this.tripSvc.create(this.newTrip).subscribe(
      data => {
        this.myHostings.push(data);
        this.newTrip.departureAddress = this.newAddress;
        this.newTrip.destinationAddress = this.newAddress;
        this.newTrip.tripCalendar = this.newTripCalendar;
        this.seeNewTrip = true;
        this.seeMyHostings = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  disableVehicle(vehicle: Vehicle) {
    vehicle.enabled = false;
    this.vSvc.updateVehicle(vehicle).subscribe(
      data => {
        console.log('User Profile Component: Able to disableVehicle()');
        this.editVehicle = null;
      },
      err => {
        console.log('User Profile Component: Unable to disableVehicle()');
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

  saveVehicle() {
    this.vSvc.updateVehicle(this.editVehicle).subscribe(
      data => {
        this.editVehicle = null;
      },
      err => {
        console.log('User Profile Component: Unable to saveVehicle()');
      }
    );
  }

  saveEditHosting() {
    this.tripSvc.update(this.editHosting).subscribe(
      data => {
        this.editHosting = null;
        this.selectedTrip = null;
      },
      err => {
        console.log('User Profile Component: Unable to saveEditHosting()');
      }
    );
  }
  savePersonalInformation() {
    this.addrSvc.updateAddress(this.currentProfile.address).subscribe(
      data => {
        this.currentProfile.address = data;
      },
      err => {
        console.log('User Profile Component: Unable to updateAddress()');
      }
    );
    this.updateUserProfile(this.currentProfile);
    this.seeEditPersonalInformation = true;
  }

  denyRequest(req: TripTraveler) {
    req.travelerStatus = 'Denied';
    this.tripTravSvc.updateTripTraveler(req).subscribe(
      data => {
        req = data;
      },
      err => {
        console.log('User Profile Component: Unable to denyRequest()');
      }
    );
  }

  approveRequest(req: TripTraveler) {
    req.travelerStatus = 'Approved';
    this.tripTravSvc.updateTripTraveler(req).subscribe(
      data => {
        req = data;
      },
      err => {
        console.log('User Profile Component: Unable to approveRequest()');
      }
    );
  }

  ngOnInit() {
    this.uSvc.getUserInSessionProfile().subscribe(
      data => {
        this.currentProfile = data;
        if (this.currentProfile.user.role === 'admin') {
          this.router.navigateByUrl('admin');

        } else {
          this.router.navigateByUrl('user-profiles');
        }
      },
      err => {
        console.log(err);
      }
    );

    this.tripSvc.indexHosted().subscribe(
      data => {
        this.myHostings = data;
      },
      err => {
        console.log('User Profile Component: Unable to load myTrips');
      }
    );

    this.tripTravSvc.myTripRequests().subscribe(
      data => {
        console.log('loading requests');
        this.myTripRequests = data;
        console.log(data);
      },
      err => {
        console.log('User Profile Component: Unable to load myTripRequests');
      }
    );

    this.tripTravSvc.myTrips().subscribe(
      data => {
        console.log('loading myTrips');
        this.myTrips = data;
        console.log(data);
      },
      err => {
        console.log('User Profile Component: Unable to load myTrips');
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
