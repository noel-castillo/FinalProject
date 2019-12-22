import { ImageComponent } from './components/image/image.component';
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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TripMessageComponent } from './components/trip-message/trip-message.component';
import { TripComponent } from './components/trip/trip.component';
import { AddressComponent } from './components/address/address.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { TripHostComponent } from './components/trip-host/trip-host.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdventureCalendarComponent } from './components/adventure-calendar/adventure-calendar.component';
import { RegisterComponent } from './components/register/register.component';
import { TripCalendarComponent } from './components/trip-calendar/trip-calendar.component';
import { LoginComponent } from './components/login/login.component';
import { TripTravelerComponent } from './components/trip-traveler/trip-traveler.component';
import { TripProfileComponent } from './components/trip-profile/trip-profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdventureComponent,
    TripMessageComponent,
    AddressComponent,
    TripComponent,
    VehicleComponent,
    UserProfileComponent,
    TripHostComponent,
    CategoriesComponent,
    UserProfileComponent,
    ImageComponent,
    LoginComponent,
    AdventureCalendarComponent,
    TripCalendarComponent,
    TripTravelerComponent,
    RegisterComponent,
    TripProfileComponent,
    LogoutComponent,
    SearchResultsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    TripService,
    TripCalendarService,
    AdventureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
