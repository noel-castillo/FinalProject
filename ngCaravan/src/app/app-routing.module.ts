import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { AdventureComponent } from './components/adventure/adventure.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  {path: 'addresses', component: AddressComponent},
  {path: 'adventures', component: AdventureComponent},
  // {path: 'adventure-calendars', component: AdventureCalendarComponent},
  // {path: 'categories', component: CategoryComponent},
  // {path: 'images', component: ImageComponent},
  // {path: "trips", component: TripComponent},
  // {path: 'trip-calendars', component: TripCalendarComponent},
  // {path: 'trip-hosts', component: TripHostComponent},
  // {path: 'trip-messages', component: TripMessageComponent},
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
