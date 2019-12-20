import { TripHost } from 'src/app/models/trip-host';
import { Component, OnInit } from '@angular/core';
import { TripHostService } from 'src/app/services/trip-host.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trip-host',
  templateUrl: './trip-host.component.html',
  styleUrls: ['./trip-host.component.css']
})
export class TripHostComponent implements OnInit {

  reviews: TripHost[] = [];
  selectedReview: TripHost;
  new = false;
  editReview: TripHost = null;

  constructor(
    private thSvc: TripHostService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
    ) { }

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
    this.loadReviews();
    if (!this.selectedReview && this.currentRoute.snapshot.paramMap.get('id')) {
      console.log('in oninit if statement');
      return this.thSvc
        .show(this.currentRoute.snapshot.paramMap.get('id'))
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
  createReview(createForm: NgForm) {
    this.thSvc.create(createForm).subscribe(
      data => {
        this.loadReviews();
        this.selectedReview = null;
        this.new = false;
      },
      error => {
        console.error('TripHostComponent.createAdventure(): Error creating new host review of passenger');
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
