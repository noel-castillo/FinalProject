import { UserProfileService } from 'src/app/services/user-profile.service';
import { MapService } from './../../services/map.service';
import { TripTraveler } from 'src/app/models/trip-traveler';
import { TripHost } from 'src/app/models/trip-host';
import { UserProfile } from './../../models/user-profile';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Trip } from 'src/app/models/trip';
import { Vehicle } from 'src/app/models/vehicle';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { TripTravelerService } from 'src/app/services/trip-traveler.service';

declare var jQuery: any;

@Component({
  selector: 'app-trip-profile',
  templateUrl: './trip-profile.component.html',
  styleUrls: ['./trip-profile.component.css']
})
export class TripProfileComponent implements OnInit {
  // F i e l d s

  builtUrl;

  tripHost: UserProfile;

  trip: Trip;
  address = '';
  tripTraveler: TripTraveler = new TripTraveler();
  tripTravelers: TripTraveler[] = [];
  thisTripTravelers: TripTraveler[] = [];
  iframeURL = '';

  currentProfile: UserProfile = null;

  joined: TripTraveler = null;


  // C o n s t r u c t o r
  // tslint:disable-next-line: max-line-length
  constructor(
    private auth: AuthService,
    private tripSvc: TripService,
    private tripTravelerSvc: TripTravelerService,
    private vehicleSvc: VehicleService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private mapSvc: MapService,
    private userPsvc: UserProfileService
  ) {}

  alert() {
    window.alert('Your join request has been sent!');
    // window.location.reload();
    // this.reloadTripTravelers(this.currentProfile);
    this.getTripTravelers();
  }

  reloadTripTravelers(tripTrav: TripTraveler) {
      this.thisTripTravelers.push(tripTrav);
  }

  getMap() {
    this.mapSvc.getRoute(this.trip).subscribe(
      data => {
        console.log('**^^GETTING MAP**^^');
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }

  getMapDetails() {
    this.mapSvc.getRouteDetails(this.trip).subscribe(
      data => {
        console.log('**^^GETTING MAP Details**^^');
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }

  getRouteUrl() {
    // this.getMapDetails();
    this.builtUrl = this.mapSvc.buildRouteUrl(this.trip);
    console.log('BUILT URL^^******' + this.builtUrl);
    return this.builtUrl;
  }

  getTripTravelers() {
    console.log('******GETTING TRIP TRAVELERS****');
    this.tripTravelerSvc.index().subscribe (
      data2 => {
        this.tripTravelers = data2;
        // this.currentRate = this.thisTripAdventureTravelers[0].rating;
        console.log('***SET RATING***');
        this.tripTravelers.forEach(element => {
          console.log('element***' + element.id);
          console.log('elementAdventureID***' + element.trip.id);
          console.log('THIS.adventure.id***' + this.trip.id);

          // this.currentRate = this.thisTripAdventureTravelers[0].rating;

          if (element.trip.id === this.trip.id) {
            console.log('ELEMENT******' + element.trip.id);
            this.thisTripTravelers.push(element);
            console.log('***REVIEWWW**' + this.thisTripTravelers[0].review);
            console.log('ELEMENT ADDED******');
            if (element.user.id === this.currentProfile.id) {
              this.joined = element;
        }
          }


          // if (this.trip.host.firstName === element.trip.host.firstName) {
          //   console.log('ELEMENT******' + element.trip.id);
          //   this.thisTripTravelers.push(element);
          //   console.log('ELEMENT ADDED******');
          // }
        });
        // console.log('***^^^^Adventure Traveler**^^ stuff ' + this.thisTripAdventureTravelers[0].review);
      },
      err => {
        console.error('***ERROR GETTING TRIP TRAVELERS' + err);
      }
    );
  }

  addTrip(tid) {
    this.tripTraveler.travelerStatus = 'pending';
    this.tripTravelerSvc.createTripTraveler(this.tripTraveler, tid).subscribe(
      data => {
        console.log(data);
        this.tripTraveler = data;
        this.thisTripTravelers.push(data);
        this.joined = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit() {
    // tslint:disable-next-line: only-arrow-functions
    (function($) {
      // tslint:disable-next-line: only-arrow-functions
      $(document).ready(function() {
        console.log('Hello from jQuery!');
      });
    })(jQuery);

    // tslint:disable-next-line: only-arrow-functions
    (function($) {
      /*------------------
          Preloader
      --------------------*/
      // $(window).on('load', function () {
      //     $(".loader").fadeOut();
      //     $("#preloder").delay(200).fadeOut("slow");
      // });

      /*------------------
          Background Set
      --------------------*/
      $('.set-bg').each(function() {
        // tslint:disable-next-line: prefer-const
        let bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
      });

      /*------------------
      Navigation
    --------------------*/
      $('.mobile-menu').slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
      });

      $('.slicknav_nav ul ').prepend('<li class="header-right-warp"></li>');
      $('.header-right')
        .clone()
        .prependTo('.slicknav_nav > ul > .header-right-warp');

      /*----------------------
          Testimonial Slider
      -----------------------*/
      $('.testimonial-item').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        smartSpeed: 1200,
        autoplay: false
      });

      /*------------------
          Magnific Popup
      --------------------*/
      $('.pop-up').magnificPopup({
        type: 'image'
      });

      /*-------------------
      Category Select
    --------------------- */
      $('.ca-search').niceSelect();

      /*-------------------
      Local Select
    --------------------- */
      $('.lo-search').niceSelect();

      /*-------------------
      Arrange Select
    --------------------- */
      $('.arrange-select select').niceSelect();

      /*-------------------
      Radio Btn
    --------------------- */
      $('.filter-left .category-filter .category-option .co-item label').on(
        'click',
        function() {
          $(
            '.filter-left .category-filter .category-option .co-item label'
          ).removeClass('active');
          $(this).addClass('active');
        }
      );

      $('.filter-left .rating-filter .rating-option .ro-item label').on(
        'click',
        function() {
          $(
            '.filter-left .rating-filter .rating-option .ro-item label'
          ).removeClass('active');
          $(this).addClass('active');
        }
      );

      $('.filter-left .distance-filter .distance-option .do-item label').on(
        'click',
        function() {
          $(
            '.filter-left .distance-filter .distance-option .do-item label'
          ).removeClass('active');
          $(this).addClass('active');
        }
      );
    })(jQuery);

    // grabs the array of trips from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    // console.log(this.currentRoute.snapshot.paramMap.get('id'));

    this.userPsvc.getUserInSessionProfile().subscribe (
      data => {
        this.currentProfile = data;
      },
      err => {
      console.log('Trip Profile Comp unable to load current Profile' + err);
      }
    );

    this.tripSvc.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.trip = data;
        this.getTripTravelers();
        this.getRouteUrl();
        window.scrollTo(0, 1);

      },
      err => {
        console.error('ngOnInit error in Trip Profile Component');
      }
    );
  }
}
