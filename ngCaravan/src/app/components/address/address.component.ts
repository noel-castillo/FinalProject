import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  // F I E L D S

  title = 'ngAddress';

  addresses: Address[] = [];


  selected: Address = null;

  newAddress: Address = new Address();

  editAddress: Address = null;

  urlId = 0;

  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private addrSvc: AddressService, private currentRoute: ActivatedRoute, private router: Router) { }

  // M E T H O D S

  ngOnInit() {

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.addrSvc.index().subscribe(
      data => {
        this.addresses = data;
      },
      err => console.error('ngOnInit error in Address Component')
    );
  }

  reload() {
    this.addrSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.addresses = aGoodThingHappened;
      },
      (didntWork) => {
        console.error('Address Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfAddresses() {
    return this.addresses.length;
  }

  countAddresses(): number {
    return this.addresses.length;
  }

  displayAddress(address) {
    this.selected = address;
  }

  displayTable() {
    this.selected = null;
  }

  addAddress() {
    this.addrSvc.create(this.newAddress).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newAddress = new Address();
        this.reload();
      },
      (didntWork) => {
        console.error('Address Component addAddress() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditAddress() {
    this.editAddress = Object.assign({}, this.selected);
  }

  updateAddress(address: Address) {
    this.addrSvc.updateAddress(address).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editAddress = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error('Address Component updateAddress(address) DID NOT WORK');
        this.reload();
      }

    );
  }

  deleteAddress(id) {
    this.addrSvc.delete(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error('Address Component deleteAddress(id) DID NOT WORK');
        this.reload();
      }

    );
  }

}
