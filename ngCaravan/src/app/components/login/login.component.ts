import { NavbarComponent } from './../navbar/navbar.component';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser = new User();
  constructor(
    private auth: AuthService,
    private route: Router,
    private uSvc: UserService
  ) {}

  ngOnInit() {}

  login(form: NgForm) {
    this.auth.login(form.value.username, form.value.password).subscribe(
      dat => {
        this.uSvc.getUserInSession().subscribe(
          user => {
            this.currentUser = user;
            if (this.currentUser.role === 'admin') {
              this.route.navigateByUrl('admin');
            } else {
              this.route.navigateByUrl('user-profiles');
            }
          },
          err => {
            console.log('in login, get user session');
            console.log(err);
          }
        );
      },
      err => {
        console.log('in login');
        console.log(err);
      }
    );
  }
}
