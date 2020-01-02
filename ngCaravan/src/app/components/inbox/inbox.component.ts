import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(
    private auth: AuthService,
    // private tripSvc: TripService,
    private currentRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.tripSvc.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
    //   data => {
    //     this.trip = data;
    //   },
    //   err => {
    //     console.error('ngOnInit error in Trip Profile Component');
    //   }
    // );
  }

}
