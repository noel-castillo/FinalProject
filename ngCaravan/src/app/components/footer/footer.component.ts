import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfile } from 'src/app/models/user-profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  userProf: UserProfile;

  constructor(private auth: AuthService, private usrProfSvc: UserProfileService) { }

  ngOnInit() {
    this.usrProfSvc.getUserInSessionProfile().subscribe(
      data => {
        this.userProf = data;

      },
      error => {
        console.error(error);
      }
    );
  }
  checkIfLoggedIn() {
    return this.auth.checkLogin();
  }

}
