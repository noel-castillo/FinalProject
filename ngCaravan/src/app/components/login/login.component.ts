import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }
login(form: NgForm) {
  this.auth.login(form.value.username, form.value).subscribe(
    dat => {
      this.route.navigateByUrl('user-profiles');
    },
    err => {
      console.log(err);
    }
  );
}
}
