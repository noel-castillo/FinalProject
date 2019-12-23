import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authSvc: AuthService, private route: Router) {}
  logged: boolean;

  ngOnInit() {

  }

  logout() {
    if (this.authSvc.checkLogin()) {
      this.authSvc.logout();
      this.route.navigateByUrl('login');
    } else {
      this.route.navigateByUrl('login');
    }
  }

}
