import { UserProfile } from 'src/app/models/user-profile';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  userProf: UserProfile;

  constructor(
    private auth: AuthService,
    private usrProfSvc: UserProfileService,
    private router: Router
    ) { }

  ngOnInit() {
    this.usrProfSvc.getUserInSessionProfile().subscribe(
      data => {

        this.userProf = data;
        console.log(this.userProf);
        console.log(data);
      },
      error => {
        console.error(error);
        this.router.navigateByUrl('not-found');
      }
    );
   }

  checkIfLoggedIn() {
    return this.auth.checkLogin();
  }
}
