import { SearchResultsComponent } from './components/search-results/search-results.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { AdventureComponent } from './components/adventure/adventure.component';
import { TripMessageComponent } from './components/trip-message/trip-message.component';
import { TripComponent } from './components/trip/trip.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TripHostComponent } from './components/trip-host/trip-host.component';
import { ImageComponent } from './components/image/image.component';
import { AdventureCalendarComponent } from './components/adventure-calendar/adventure-calendar.component';

import { RegisterComponent } from './components/register/register.component';

import { TripCalendarComponent } from './components/trip-calendar/trip-calendar.component';
import { TripTravelerComponent } from './components/trip-traveler/trip-traveler.component';
import { TripProfileComponent } from './components/trip-profile/trip-profile.component';
import { AdventureProfileComponent } from './components/adventure-profile/adventure-profile.component';



const routes: Routes = [
  {path: 'addresses', component: AddressComponent},
  {path: 'adventures', component: AdventureComponent},
  {path: 'adventures/:id', component: AdventureComponent},
  {path: 'adventure-calendars', component: AdventureCalendarComponent},
  {path: 'adventure-profile/:id', component: AdventureProfileComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'images', component: ImageComponent},
  {path: 'trips', component: TripComponent},
  {path: 'trips/:id', component: TripProfileComponent},
  {path: 'trip-calendars', component: TripCalendarComponent},
  {path: 'trip-hosts', component: TripHostComponent},
  {path: 'messages', component: TripMessageComponent},
  {path: 'trip-travelers', component: TripTravelerComponent},
  // {path: 'users', component: UserComponent},
  {path: 'user-profiles', component: UserProfileComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search-results', component: SearchResultsComponent},
  {path: 'trip-profile/:id', component: TripProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
