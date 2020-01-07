import { UserProfile } from 'src/app/models/user-profile';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { windowWhen } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  userProf: UserProfile;

  mySubscription: any;

  constructor(
    private auth: AuthService,
    private usrProfSvc: UserProfileService,
    private router: Router
  ) {
    // tslint:disable-next-line: only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.mySubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.userProf = null;
    this.usrProfSvc.getUserInSessionProfile().subscribe(
      data => {
        this.userProf = data;
      },
      error => {
        console.error(error);
        this.router.navigateByUrl('search-results');
      }
    );
  }

  reload(): string {
    this.usrProfSvc.getUserInSessionProfile().subscribe(
      data => {
        this.userProf = data;
      },
      error => {
        console.error(error);
        this.router.navigateByUrl('search-results');
      }
    );

    return this.userProf.firstName;

  }
  setProfileNull() {
    this.userProf = null;
  }
  checkIfLoggedIn() {
    return this.auth.checkLogin();
  }

  goToSearch() {
    this.router.navigateByUrl('search-results');
  }
}
