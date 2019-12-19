import { TripMessage } from './../../models/trip-message';
import { TripMessageService } from './../../services/trip-message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-message',
  templateUrl: './trip-message.component.html',
  styleUrls: ['./trip-message.component.css']
})
export class TripMessageComponent implements OnInit {
  messages: TripMessage[] = [];
  constructor(private tmSvc: TripMessageService) {}

  ngOnInit() {
    this.tmSvc.index().subscribe(
      data => {
        console.log(data);
        this.messages = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
