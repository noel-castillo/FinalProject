<<<<<<< HEAD
import { UserProfile } from 'src/app/models/user-profile';
=======
import { Router } from '@angular/router';
>>>>>>> 01ca6a3ac3710225433cf4eaa18d0d42985427cf
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

<<<<<<< HEAD
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

=======
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {}
>>>>>>> 01ca6a3ac3710225433cf4eaa18d0d42985427cf
  checkIfLoggedIn() {
    return this.auth.checkLogin();
  }
  goToSearch() {
    this.route.navigateByUrl('search-results');
  }
}
