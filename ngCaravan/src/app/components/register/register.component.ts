import { NgForm } from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle';
import { AddressService } from './../../services/address.service';
import { VehicleService } from './../../services/vehicle.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser = new User();

  constructor(
    private auth: AuthService,
    private user: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    this.newUser = new User();
  }

  create(newUsr: User) {
    newUsr.role = 'standard';
    newUsr.enabled = true;

    this.auth.register(newUsr).subscribe(
      data => {
        this.newUser = new User();
        this.route.navigateByUrl('user-profiles');
      },
      err => {
        console.log(err);
        this.route.navigateByUrl('register');
      }
    );
  }
}
