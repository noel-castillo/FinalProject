import { AdventureService } from './services/adventure.service';
import { AdventureComponent } from './components/adventure/adventure.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripService } from './services/trip.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TripCalendarService } from './services/trip-calendar.service';
import { NavbarComponent } from './components/navbar/navbar.component';
<<<<<<< HEAD
import { TripMessageComponent } from './components/trip-message/trip-message.component';
import { TripComponent } from './components/trip/trip.component';
=======

import { TripMessageComponent } from './components/trip-message/trip-message.component';

import { TripComponent } from './components/trip/trip.component';

>>>>>>> e5b931ac2e58a3404c082ac1922736ce89aa18d5
import { AddressComponent } from './components/address/address.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdventureComponent,
<<<<<<< HEAD
    TripMessageComponent,
    AddressComponent,
    TripComponent,
    AddressComponent,
    VehicleComponent
=======

    TripMessageComponent,
    AddressComponent,

    TripComponent,
    AddressComponent,
    VehicleComponent

>>>>>>> e5b931ac2e58a3404c082ac1922736ce89aa18d5

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    TripService,
    TripCalendarService,
    AdventureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
