import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Adventure } from 'src/app/models/adventure';
import { Trip } from 'src/app/models/trip';
import { AdventureService } from 'src/app/services/adventure.service';
import { TripService } from 'src/app/services/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventureTravelerService } from 'src/app/services/adventure-traveler.service';
import { AdventureTraveler } from 'src/app/models/adventure-traveler';
import { AdventureHost } from 'src/app/models/adventure-host.model';

declare var jQuery: any;

@Component({
  selector: 'app-adventure-profile',
  templateUrl: './adventure-profile.component.html',
  styleUrls: ['./adventure-profile.component.css']
})
export class AdventureProfileComponent implements OnInit {

  // F I E L D S

  adventure: Adventure;
  address = '';
  adventureTraveler: AdventureTraveler = new AdventureTraveler();
  adventureTravelers: AdventureTraveler[];
  thisTripAdventureTravelers: AdventureTraveler[] = [];
  thisTripAdventureTravelerss: AdventureTraveler[] = [];
  adventureHostReview: AdventureTraveler;
  currentRate: number;

  // C O N S T R U C T O R

  constructor(private adventureSvc: AdventureService,
              private adventureTravelerSvc: AdventureTravelerService,
              private currentRoute: ActivatedRoute,
              private router: Router ) { }

  // M E T H O D S

  addAdventure(aid) {
    this.adventureTravelerSvc.createAdventureTraveler(this.adventureTraveler, aid).subscribe (
      data => {
        console.log(data);
        this.adventureTraveler = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  loadAdventure() {
    this.adventureSvc.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        console.log('***** IN Load Adventure');
        this.adventure = data;
        this.address = '';
        this.address += this.adventure.address.street + ', ';
        this.address += this.adventure.address.city + ', ';
        this.address += this.adventure.address.state + ' ';
        this.address += this.adventure.address.zip + ' ';
        this.address.replace(/ /g, '+');

        // this.adventure.host.
      },
      err => {
        console.error('Adventure Profile Component: Unable to load adventure');
      }
    );

    this.adventureTravelerSvc.index().subscribe (
      data => {
        this.adventureTravelers = data;
        console.log('****INDEX AdenTrav****' + this.adventureTravelers[0].review);
      },
      err => {
        console.error(err);
      }
    );

    console.log('AT END OF LOAD ADVENTURE************');
  }

  // ngOnInit

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

    // this.loadAdventure();

        // grabs the array of trips from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    // console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.adventureSvc.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.adventure = data;
        console.log('At end of Getting adventure********');
        console.log('**AVENTURE TITLE ' + this.adventure.title);
        console.log('**AVENTURE HOST ' + this.adventure.host);
        this.address = '';
        this.address += this.adventure.address.street + ', ';
        this.address += this.adventure.address.city + ', ';
        this.address += this.adventure.address.state + ' ';
        this.address += this.adventure.address.zip + ' ';
        this.address.replace(/ /g, '+');



        this.adventureTravelerSvc.index().subscribe (
          data2 => {
            this.adventureTravelers = data2;
            // this.currentRate = this.thisTripAdventureTravelers[0].rating;
            console.log('***SET RATING***');
            this.adventureTravelers.forEach(element => {
              console.log('element***' + element.id);
              console.log('elementAdventureID***' + element.adventure.id);
              console.log('THIS.adventure.id***' + this.adventure.id);

              // this.currentRate = this.thisTripAdventureTravelers[0].rating;

              if (element.adventure.id === this.adventure.id) {
                console.log('ELEMENT******' + element.adventure.id);
                this.thisTripAdventureTravelerss.push(element);
                console.log('ELEMENT ADDED******');
              }

              if (this.adventure.host.firstName === element.adventure.host.firstName) {
                console.log('ELEMENT******' + element.adventure.id);
                this.thisTripAdventureTravelers.push(element);
                console.log('ELEMENT ADDED******');
              }
            });
            // console.log('***^^^^Adventure Traveler**^^ stuff ' + this.thisTripAdventureTravelers[0].review);
          },
          err => {
            console.error(err);
          }
        );

      },
      err => {
        console.error('ngOnInit error in Adventure Profile Component');
      }
    );

  }



}
