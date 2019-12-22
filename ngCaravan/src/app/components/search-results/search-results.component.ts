import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Adventure } from 'src/app/models/adventure';
import { Trip } from 'src/app/models/trip';
import { AdventureService } from 'src/app/services/adventure.service';
import { TripService } from 'src/app/services/trip.service';

declare var jQuery: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],

})

export class SearchResultsComponent implements OnInit {

  // F i e l d s

  trips: Trip[] = [];
  adventures: Adventure[] = [];
  types: string[] = ['trips', 'adventures'];
  searchType: string;

  // C o n s t r u c t o r

  constructor(private tripSvc: TripService, private adventureSvc: AdventureService) { }

  // M E T H O D S


  search(form: NgForm) {
    console.log(form.value.location);
    console.log(form.value.searchType);
    console.log(this.searchType);
    if (this.searchType === 'trips') {
      this.tripSvc.index().subscribe(
        data => {
          this.trips = data;
        },
        err => {
          console.error('Search-Results Component: Unable to load trips');
        }
      );

    }

    if (true) {
      this.adventureSvc.index().subscribe(
        data => {
          this.adventures = data;
        },
        err => {
          console.error('Search-Results Component: Unable to load adventures');
        }
      );
    }

  }

  ngOnInit() {
    this.trips = null;
    this.adventures = null;
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
      $('.header-right').clone().prependTo('.slicknav_nav > ul > .header-right-warp');

      /*----------------------
          Testimonial Slider
      -----------------------*/
      $('.testimonial-item').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoplay: false,
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
      $('.filter-left .category-filter .category-option .co-item label').on('click', function() {
        $('.filter-left .category-filter .category-option .co-item label').removeClass('active');
        $(this).addClass('active');
      });

      $('.filter-left .rating-filter .rating-option .ro-item label').on('click', function() {
        $('.filter-left .rating-filter .rating-option .ro-item label').removeClass('active');
        $(this).addClass('active');
      });

      $('.filter-left .distance-filter .distance-option .do-item label').on('click', function() {
        $('.filter-left .distance-filter .distance-option .do-item label').removeClass('active');
        $(this).addClass('active');
      });

    })(jQuery);

  }

}
