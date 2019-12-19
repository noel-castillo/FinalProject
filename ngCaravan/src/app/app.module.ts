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
import { TripComponent } from './components/trip/trip.component';
=======
import { AddressComponent } from './components/address/address.component';
>>>>>>> 3f4750f4db1de463e2a4627a0abfab1134792eb9


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdventureComponent,
<<<<<<< HEAD
    TripComponent
=======
    AddressComponent
>>>>>>> 3f4750f4db1de463e2a4627a0abfab1134792eb9

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
