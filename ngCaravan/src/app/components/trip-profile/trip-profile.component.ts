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

  tripHost: UserProfile;

  trip: Trip;
  address = '';
  tripTraveler: TripTraveler = new TripTraveler();
  iframeURL = '';


  // C o n s t r u c t o r
  // tslint:disable-next-line: max-line-length
  constructor(
    private auth: AuthService,
    private tripSvc: TripService,
    private tripTravelerSvc: TripTravelerService,
    private vehicleSvc: VehicleService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  addTrip(tid) {
    this.tripTraveler.travelerStatus = 'pending';
    this.tripTravelerSvc.createTripTraveler(this.tripTraveler, tid).subscribe(
      data => {
        console.log(data);
        this.tripTraveler = data;
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
    this.tripSvc.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.trip = data;
      },
      err => {
        console.error('ngOnInit error in Trip Profile Component');
      }
    );
  }
}
