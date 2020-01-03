import { AdventureCalendar } from './../../models/adventure-calendar';
import { AdventureService } from 'src/app/services/adventure.service';
import { Component, OnInit } from '@angular/core';
import { Adventure } from 'src/app/models/adventure';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {

  // F I E L D S

  adventures: Adventure[] = [];
  selectedAdventure: Adventure;
  new = false;
  editAdventure: Adventure = null;

  // C O N S T R U C T O R

  constructor(
    private advSvc: AdventureService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.loadAdventures();
    if (!this.selectedAdventure && this.currentRoute.snapshot.paramMap.get('id')) {
      console.log('in oninit if statement');
      return this.advSvc
        .show(this.currentRoute.snapshot.paramMap.get('id'))
        .subscribe(
          data => {
            this.selectedAdventure = data;
          },
          error => {
            console.error(error);
            this.router.navigateByUrl('not-found');
          }
        );
    }
  }
  loadAdventures() {
    this.advSvc.index().subscribe(
      data => {
        this.adventures = data;
      },
      error => {
        console.error('AdventureComponent.index(): Error getting all portfolios');
        console.error(error);
      }
    );
  }

  addAdventure(form: NgForm) {
    const myNewAdventure = new Adventure();

    const myNewCalendar = new AdventureCalendar();
    myNewCalendar.startDate = form.value.startDate;
    myNewCalendar.endDate = form.value.endDate;

    const myNewAddress = new Address();
    myNewAddress.street = form.value.departureAddressStreet;
    myNewAddress.city = form.value.departureAddressCity;
    myNewAddress.state = form.value.departureAddressState;
    myNewAddress.zip = form.value.departureAddressZip;

    myNewAdventure.adventureCalendar = myNewCalendar;
    myNewAdventure.title = form.value.title;
    myNewAdventure.address = myNewAddress;
    myNewAdventure.description = form.value.description;
    myNewAdventure.activityLvl = form.value.activityLvl;
    myNewAdventure.includes = form.value.inclued;
    myNewAdventure.price = form.value.price;
    myNewAdventure.itinerary = form.value.itinerary;
    myNewAdventure.host = form.value.host;


    console.log(myNewAdventure);
    this.advSvc.create(form).subscribe(
      data => {
        console.log(data);
        this.loadAdventures();
      },
      err => {
        console.error(err);
      }
    );
  }
  createAdventure(createForm: NgForm) {
    this.advSvc.create(createForm).subscribe(
      data => {
        this.loadAdventures();
        this.selectedAdventure = null;
        this.new = false;
      },
      error => {
        console.error('AdventureComponent.createAdventure(): Error creating new adventure');
        console.error(error);
      }
    );
  }

  updateAdventure() {
    this.advSvc.update(this.editAdventure).subscribe(
      data => {
        this.loadAdventures();
        this.editAdventure = null;
        this.selectedAdventure = null;
      },
      err => {
        console.error('Error in updateAdventure()');
        console.error(err);
      }
    );
  }
  deleteAdventure() {
    this.advSvc.destroy(this.editAdventure).subscribe(
      success => {
        this.loadAdventures();
        this.editAdventure = null;
        this.selectedAdventure = null;
      },
      failure => {
        console.error('AdventureComponent.deleteAdventure(): Error deleting adventure');
        console.error(failure);
      }
    );
  }

}
