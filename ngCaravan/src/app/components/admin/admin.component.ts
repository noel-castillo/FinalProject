import { Image } from './../../models/image';
import { Component, OnInit } from '@angular/core';
import { TripHost } from 'src/app/models/trip-host';
import { UserProfile } from 'src/app/models/user-profile';
import { TripTraveler } from 'src/app/models/trip-traveler';
import { Vehicle } from 'src/app/models/vehicle';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TripTravelerService } from 'src/app/services/trip-traveler.service';
import { AddressService } from 'src/app/services/address.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip';
import { TripCalendar } from 'src/app/models/trip-calendar';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentProfile: UserProfile = new UserProfile();

  admin = false;

  trips: Trip[] = [];

  myHostings: Trip[] = [];

  myTrips: TripTraveler[] = [];

  selected: UserProfile = null;

  userProfiles: UserProfile[] = [];

  newUserProfile: UserProfile = new UserProfile();

  editUserProfile: UserProfile = null;

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

  seePersonalInformation = false;

  seeMyTrips = true;

  seeNewTrip = true;

  seeAdmin = true;

  seeUsers = true;

  seeTrips = true;

  seeMyHostings = true;

  seeNewVehicle = true;

  seePendingRequests = true;

  seeEditPersonalInformation = true;

  selectedTrip: Trip = null;

  allUsers: User[];

  allTrips: Trip[];

  editVehicle: Vehicle = null;

  editHosting: Trip = null;

  // C O N S T R U C T O R

  constructor(
    private uSvc: UserProfileService,
    private auth: AuthService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private tripTravSvc: TripTravelerService,
    private tripSvc: TripService,
    private addrSvc: AddressService,
    private vSvc: VehicleService,
    private usrSvc: UserService
  ) {}

  // M E T H O D S

  openNav() {
    if ( document.getElementById('mySidenav').style.width === '250px') {
      document.getElementById('mySidenav').style.width = '0px';
    } else {
    document.getElementById('mySidenav').style.width = '250px';
    }
  }


  showHosting() {
    this.seeNewTrip = true;

    this.seeMyHostings = true;

    this.seePendingRequests = true;

    this.selectedTrip = null;

    this.newTrip.departureAddress = new Address();
    this.newTrip.destinationAddress = new Address();
    this.newTrip.tripCalendar = new TripCalendar();
  }

  hideAccountSettings() {
    this.seeVehicles = false;

    this.seeMyTrips = false;

    this.seePersonalInformation = true;

    this.seeEditPersonalInformation = true;


  }

  disableTrip(trip: Trip) {
    trip.enabled = false;
    this.tripSvc.update(trip).subscribe(
      data => {
        console.log('User Profile Component: Able to disableTrip()');
      },
      err => {
        console.log('User Profile Component: Unable to disableTrip()');
      }
    );
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

  showAdmin() {
    this.seeAdmin = true;
  }

  addNewVehicle() {
    this.newVehicle.enabled = true;
    this.vSvc.create(this.newVehicle).subscribe(
      data => {
        console.log('Vehicle has been created!');
        this.newVehicle = new Vehicle();
        this.seeNewVehicle = true;
        this.currentProfile.vehicles.push(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  setEnabled(user: User): boolean {
    return user.enabled;
  }

  setEnabledTrip(trip: Trip): boolean {
    return trip.enabled;
  }

  isAdmin(user: User): boolean {
    if (user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  isStandard(user: User): boolean {
    if (user.role === 'standard' || user.role === null) {
      return true;
    } else {
      return false;
    }
  }
  changeRole(user: User) {
    if (user.role === 'admin') {
      user.role = 'standard';

      this.usrSvc.update(user, user.id).subscribe(
        dat => {
          this.usrSvc.index().subscribe(
            data => {
              this.allUsers = data;
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    } else {
      user.role = 'admin';

      this.usrSvc.update(user, user.id).subscribe(
        dat => {
          this.usrSvc.index().subscribe(
            data => {
              this.allUsers = data;
            },
            err => {
              console.log(err);
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  enableDisableUser(user: User) {
    user.enabled = !user.enabled;

    this.usrSvc.update(user, user.id).subscribe(
      dat => {
        this.usrSvc.index().subscribe(
          data => {
            this.allUsers = data;
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  enableDisableTrip(trip: Trip) {
    trip.enabled = !trip.enabled;

    this.tripSvc.update(trip).subscribe(
      dat => {
        this.tripSvc.index().subscribe(
          data => {
            this.allTrips = data;
          },
          err => {
            console.log(err);
          }
        );
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
        this.newTrip.departureAddress = new Address();
        this.newTrip.destinationAddress = new Address();
        this.newTrip.tripCalendar = new TripCalendar();
        this.seeNewTrip = true;
        this.seeMyHostings = false;
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
      },
      err => {
        console.log(err);
      }
    );
    this.tripSvc.index().subscribe(
      data => {
        this.allTrips = data;
      },
      err => {
        console.log(err);
      }
    );

    this.usrSvc.index().subscribe(
      data => {
        this.allUsers = data;
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
