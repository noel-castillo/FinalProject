import { UserProfile } from './../../models/user-profile';
import { UserProfileService } from './../../services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // F I E L D S

  userProfiles: UserProfile[] = [];


  // C O N S T R U C T O R

  constructor(private uSvc: UserProfileService, private auth: AuthService, private currentRoute: ActivatedRoute, private router: Router) { }


  // M E T H O D S

  ngOnInit() {
    this.auth.login('shaun', 'wombat1').subscribe(
      data => {
        console.log('Logged in');
        this.router.navigateByUrl('addresses');
      },
      err => {
        console.error('Error logging in.');
        console.error(err);
      }
    );

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.uSvc.index().subscribe(
      data => {
        this.userProfiles = data;
      },
      err => console.error('ngOnInit error in UserProfile Component')
    );
  }


}
