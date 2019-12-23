import { AdventureService } from 'src/app/services/adventure.service';
import { Component, OnInit } from '@angular/core';
import { Adventure } from 'src/app/models/adventure';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {

  adventures: Adventure[] = [];
  selectedAdventure: Adventure;
  new = false;
  editAdventure: Adventure = null;

  constructor(
    private advSvc: AdventureService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.loadAdventures();
    if (!this.selectedAdventure && this.currentRoute.snapshot.paramMap.get('id')) {
      console.log('in oninit if statement');
      return this.advSvc
        .show(this.currentRoute.snapshot.paramMap.get('id'))
        .subscribe(
          data => {
            this.selectedAdventure = data;
          },
          error => {
            console.error(error);
            this.router.navigateByUrl('not-found');
          }
        );
    }
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
  createAdventure(createForm: NgForm) {
    this.advSvc.create(createForm).subscribe(
      data => {
        this.loadAdventures();
        this.selectedAdventure = null;
        this.new = false;
      },
      error => {
        console.error('AdventureComponent.createAdventure(): Error creating new adventure');
        console.error(error);
      }
    );
  }

  updateAdventure() {
    this.advSvc.update(this.editAdventure).subscribe(
      data => {
        this.loadAdventures();
        this.editAdventure = null;
        this.selectedAdventure = null;
      },
      err => {
        console.error('Error in updateAdventure()');
        console.error(err);
      }
    );
  }
  deleteAdventure() {
    this.advSvc.destroy(this.editAdventure).subscribe(
      success => {
        this.loadAdventures();
        this.editAdventure = null;
        this.selectedAdventure = null;
      },
      failure => {
        console.error('AdventureComponent.deleteAdventure(): Error deleting adventure');
        console.error(failure);
      }
    );
  }

}
