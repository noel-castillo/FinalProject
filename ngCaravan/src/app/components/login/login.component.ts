import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';

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
              this.route.navigateByUrl('nav');
              this.route.navigateByUrl('admin');
            } else {
              this.route.navigateByUrl('nav');
              this.route.navigateByUrl('user-profiles');
            }
          },
          err => {
            console.log('in login, get user session');
            console.log(err);
            this.route.navigateByUrl('login');
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
