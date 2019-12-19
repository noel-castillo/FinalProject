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
import { TripComponent } from './components/trip/trip.component';
import { AddressComponent } from './components/address/address.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdventureComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    TripComponent,
    AddressComponent
=======
    AddressComponent,
    VehicleComponent
>>>>>>> e045bc99256895be22029f4d767d66a72206580c
=======
    TripComponent,
    AddressComponent,
    VehicleComponent
>>>>>>> 6fa96fd01f25e673091af8c7e8af0622e5663934

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
