import { UserService } from './../../services/user.service';
import { UserProfile } from './../../models/user-profile';
import { DirectMessage } from './../../models/direct-message';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectMessageService } from 'src/app/services/direct-message.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  // F I E L D S

  messages: DirectMessage[] = [];

  friends: UserProfile[] = [];

  friendsMap: Map<number, UserProfile> = new Map<number, UserProfile>();

  myMap = {};

  selected = null;

  me = null;

  myReply: DirectMessage = new DirectMessage();

// C O N S T R U C T O R

  constructor(
    private auth: AuthService,
    private dmSvc: DirectMessageService,
    private uSvc: UserService,
    private currentRoute: ActivatedRoute,
    private router: Router) { }

    // M E T H O D S

    reply() {
      this.dmSvc.createDirectMessage(this.myReply, this.selected.id).subscribe(
        data => {
          this.myReply = data;
          this.dmSvc.getMessages().subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            data => {
              this.messages = data;
              this.friends = [];
              this.messages.forEach((message) => {
                  if (!this.friendsMap.has(message.friendProfile.id)
                  && message.friendProfile.user.id !== this.me.id) {
                    this.friendsMap.set(message.friendProfile.id, message.friendProfile);
                    this.friends.push(message.friendProfile);
                  }
              });
            },
            err => {
              console.error('Inbox Component: Unable to load messages by user');
            }
          );
        },
        err => {
          console.error('Inbox Component: Unable to reply()');
        }
      );
    }

  ngOnInit() {
    this.uSvc.getUserInSession().subscribe(
      data => {
        this.me = data;
      },
      err => {
        console.error('Inbox Component: Unable to load user in sessions');
      }
    );
    this.dmSvc.getMessages().subscribe(
      data => {
        this.messages = data;
        this.friends = [];
        this.messages.forEach((message) => {
            if (!this.friendsMap.has(message.friendProfile.id)
            && message.friendProfile.user.id !== this.me.id) {
              this.friendsMap.set(message.friendProfile.id, message.friendProfile);
              this.friends.push(message.friendProfile);
            }
        });
      },
      err => {
        console.error('Inbox Component: Unable to load messages by user');
      }
    );
  }

}
