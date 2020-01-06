import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './components/address/address.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdventureCalendarComponent } from './components/adventure-calendar/adventure-calendar.component';
import { AdventureProfileComponent } from './components/adventure-profile/adventure-profile.component';
import { AdventureTravelerComponent } from './components/adventure-traveler/adventure-traveler.component';
import { AdventureComponent } from './components/adventure/adventure.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageComponent } from './components/image/image.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { TripCalendarComponent } from './components/trip-calendar/trip-calendar.component';
import { TripHostComponent } from './components/trip-host/trip-host.component';
import { TripMessageComponent } from './components/trip-message/trip-message.component';
import { TripProfileComponent } from './components/trip-profile/trip-profile.component';
import { TripTravelerComponent } from './components/trip-traveler/trip-traveler.component';
import { TripComponent } from './components/trip/trip.component';
import { TripsNotHostedComponent } from './components/trips-not-hosted/trips-not-hosted.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { FriendMessagesPipe } from './pipes/friend-messages.pipe';
import { LatestMessagePipe } from './pipes/latest-message.pipe';
import { MapPipe } from './pipes/map.pipe';
import { TripRequestPipe } from './pipes/trip-request.pipe';
import { AdventureService } from './services/adventure.service';
import { TripCalendarService } from './services/trip-calendar.service';
import { TripService } from './services/trip.service';
import { NotfoundComponent } from './components/notfound/notfound.component';




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
    SearchResultsComponent,
    AdventureProfileComponent,
    TripsNotHostedComponent,
    TripRequestPipe,
    AdminComponent,
    AdventureTravelerComponent,
    BottomBarComponent,
    InboxComponent,
    FriendMessagesPipe,
    LatestMessagePipe,
    MapPipe,
    FooterComponent,
    NotfoundComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2PageScrollModule,
    MatCardModule

  ],
  providers: [
    TripService,
    TripCalendarService,
    AdventureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
