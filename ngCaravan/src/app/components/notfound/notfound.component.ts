import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}

  gotToSearch() {
    this.route.navigateByUrl('search-results');
  }
}
