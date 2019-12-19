import { AdventureService } from 'src/app/services/adventure.service';
import { Component, OnInit } from '@angular/core';
import { Adventure } from 'src/app/models/adventure';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {

  adventures: Adventure[] = [];

  constructor(
    private advSvc: AdventureService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.auth.login('shaun', 'wombat1').subscribe(
      data => {
        console.log('Logged in');
        this.router.navigateByUrl('adventures');
      },
      err => {
        console.error('Error logging in.');
        console.error(err);
      }
    );
    this.loadAdventures();
  }
  loadAdventures() {
    this.advSvc.index().subscribe(
      data => {
        this.adventures = data;
      },
      error => {
        console.error('AdventureComponent.index(): Error getting all portfolios');
        console.error(error);
      }
    );
  }

}
