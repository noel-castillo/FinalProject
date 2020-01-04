import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {}
  checkIfLoggedIn() {
    return this.auth.checkLogin();
  }
  goToSearch() {
    this.route.navigateByUrl('search-results');
  }
}
