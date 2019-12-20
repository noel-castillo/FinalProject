import { AdventureCalendarService } from './../../services/adventure-calendar.service';
import { AdventureCalendar } from './../../models/adventure-calendar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adventure-calendar',
  templateUrl: './adventure-calendar.component.html',
  styleUrls: ['./adventure-calendar.component.css']
})
export class AdventureCalendarComponent implements OnInit {

  // F I E L D S

  selected: AdventureCalendar = null;

  userProfiles: AdventureCalendar[] = [];

  newUserProfile: AdventureCalendar = new AdventureCalendar();

  editUserProfile: AdventureCalendar = null;



  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private aSvc: AdventureCalendarService, private auth: AuthService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
