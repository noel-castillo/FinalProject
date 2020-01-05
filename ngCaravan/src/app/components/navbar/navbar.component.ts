import { UserProfile } from 'src/app/models/user-profile';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
>>>>>>> 07b49e2e60c8cd89ecbb1f18a15da52dfc2cb002
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';

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
<<<<<<< HEAD
  }
=======
   }

>>>>>>> 07b49e2e60c8cd89ecbb1f18a15da52dfc2cb002
  checkIfLoggedIn() {
    return this.auth.checkLogin();
  }
  goToSearch() {
    this.router.navigateByUrl('search-results');
  }
}
