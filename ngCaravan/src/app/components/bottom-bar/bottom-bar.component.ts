import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  checkIfLoggedIn() {
    return this.auth.checkLogin();
  }
}
