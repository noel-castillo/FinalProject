import { TripTraveler } from './../../models/trip-traveler';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { TripHost } from 'src/app/models/trip-host';
import { UserProfile } from 'src/app/models/user-profile';
import { AuthService } from 'src/app/services/auth.service';
import { TripHostService } from 'src/app/services/trip-host.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { TripService } from './../../services/trip.service';

@Component({
  selector: 'app-trip-host',
  templateUrl: './trip-host.component.html',
  styleUrls: ['./trip-host.component.css']
})
export class TripHostComponent implements OnInit {

  reviews: TripHost[] = [];
  selectedReview: TripHost;
  trips: Trip[] = [];
  selectedTripPassenger: TripTraveler = null;
  new = false;
  editReview: TripHost = null;
  currentUser: UserProfile;
  admin = false;

  constructor(
    private thSvc: TripHostService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private userProSvc: UserProfileService,
    private tripSvc: TripService
    ) { }

  ngOnInit() {
    this.loadReviews();
    this.loadTrips();

    this.userProSvc.getUserInSessionProfile().subscribe(
      data => {
        this.currentUser = data;
        this.checkIfAdmin();
      },
      error => {
        console.error(error);
        this.router.navigateByUrl('not-found');
      }
    );
    if (!this.selectedReview && this.currentRoute.snapshot.paramMap.get('id')) {
      console.log('in oninit if statement');
      return this.thSvc.show(this.currentRoute.snapshot.paramMap.get('id'))
        .subscribe(
          data => {
            this.selectedReview = data;
          },
          error => {
            console.error(error);
            this.router.navigateByUrl('not-found');
          }
        );
    }
  }
  checkIfAdmin() {
    this.userProSvc.getUserInSessionProfile().subscribe(
      data => {
        this.currentUser = data;
        if (this.currentUser.user.role === 'admin') {
          this.admin = true;
        } else {
          this.admin = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  loadReviews() {
    this.thSvc.index().subscribe(
      data => {
        this.reviews = data;
      },
      error => {
        console.error('TripHostComponent.index(): Error getting all host reviews of passengers');
        console.error(error);
      }
    );
  }
  loadTrips() {
    this.tripSvc.index().subscribe(
      data => {
        this.trips = data;
        console.log(this.trips);
      },
      err => {
        console.error(err);
      }
    );
  }

  createReview(createForm: NgForm) {
    console.log('in create Review');
    console.log(this.selectedTripPassenger);
    const newTripHostReview = {
      rating: createForm.value.rating,
      review: createForm.value.review,
      trip: {
        id: this.selectedTripPassenger.trip.id},
      passenger: {
        id : this.selectedTripPassenger.user.id}
    };
    console.log(newTripHostReview);
    this.thSvc.create(newTripHostReview).subscribe(
      data => {
        this.loadReviews();
        this.selectedReview = null;
        this.new = false;
      },
      error => {
        console.error('TripHostComponent.createReview(): Error creating new host review of passenger');
        console.error(error);
      }
    );
  }

  updateReview() {
    this.thSvc.update(this.editReview).subscribe(
      data => {
        this.loadReviews();
        this.editReview = null;
        this.selectedReview = null;
      },
      err => {
        console.error('TripHostComponent.updateReview: Error in editing host review of passenger.');
        console.error(err);
      }
    );
  }
  deleteReview() {
    this.thSvc.destroy(this.editReview.id).subscribe(
      success => {
        this.loadReviews();
        this.editReview = null;
        this.selectedReview = null;
      },
      failure => {
        console.error('TripHostComponent.deleteReview(): Error deleting host review of passenger.');
        console.error(failure);
      }
    );
  }

}
