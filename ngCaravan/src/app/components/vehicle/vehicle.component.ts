import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from './../../models/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  // F I E L D S

  title = 'ngVehicle';

  vehicles: Vehicle[] = [];


  selected: Vehicle = null;

  newVehicle: Vehicle = new Vehicle();

  editVehicle: Vehicle = null;

  urlId = 0;

  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private vehicleSvc: VehicleService, private currentRoute: ActivatedRoute, private router: Router) { }

  // M E T H O D S

  ngOnInit() {

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.vehicleSvc.index().subscribe(
      data => {
        this.vehicles = data;
      },
      err => console.error('ngOnInit error in Vehicle Component')
    );
  }

  reload() {
    this.vehicleSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.vehicles = aGoodThingHappened;
      },
      (didntWork) => {
        console.error('Vehicle Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfVehicles() {
    return this.vehicles.length;
  }

  countVehicles(): number {
    return this.vehicles.length;
  }

  displayVehicle(vehicle) {
    this.selected = vehicle;
  }

  displayTable() {
    this.selected = null;
  }

  addVehicle() {
    this.vehicleSvc.create(this.newVehicle).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newVehicle = new Vehicle();
        this.reload();
      },
      (didntWork) => {
        console.error('Vehicle Component addVehicle() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditVehicle() {
    this.editVehicle = Object.assign({}, this.selected);
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleSvc.updateVehicle(vehicle).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editVehicle = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error('Vehicle Component updateVehicle(vehicle) DID NOT WORK');
        this.reload();
      }

    );
  }

  deleteVehicle(id) {
    this.vehicleSvc.delete(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error('Vehicle Component deleteAddress(id) DID NOT WORK');
        this.reload();
      }

    );
  }

}
