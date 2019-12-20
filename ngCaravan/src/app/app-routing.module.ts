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


const routes: Routes = [
  {path: 'addresses', component: AddressComponent},
  {path: 'adventures', component: AdventureComponent},
  {path: 'adventures/:id', component: AdventureComponent},
  // {path: 'adventure-calendars', component: AdventureCalendarComponent},
  {path: 'categories', component: CategoriesComponent},
  // {path: 'images', component: ImageComponent},
  {path: 'trips', component: TripComponent},
  // {path: 'trip-calendars', component: TripCalendarComponent},
  {path: 'trip-hosts', component: TripHostComponent},
  {path: 'trip-messages', component: TripMessageComponent},
  // {path: 'trip-travelers', component: TripTravelerComponent},
  // {path: 'users', component: UserComponent},
  {path: 'user-profiles', component: UserProfileComponent},
  {path: 'vehicles', component: VehicleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
