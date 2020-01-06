import { UserService } from './../../services/user.service';
import { UserProfile } from './../../models/user-profile';
import { DirectMessage } from './../../models/direct-message';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectMessageService } from 'src/app/services/direct-message.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollBottom', null) private scrollBottom: ElementRef;

  // F I E L D S

  messages: DirectMessage[] = [];

  friends: UserProfile[] = [];

  friendsMap: Map<number, UserProfile> = new Map<number, UserProfile>();

  myMap = {};

  selected = null;

  me = null;

  myReply: DirectMessage = new DirectMessage();

  users: UserProfile[] = [];

  fid = 0;

  // C O N S T R U C T O R

  constructor(
    private auth: AuthService,
    private dmSvc: DirectMessageService,
    private uSvc: UserService,
    private upSvc: UserProfileService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  // M E T H O D S

  reply() {
    this.dmSvc.createDirectMessage(this.myReply, this.selected.id).subscribe(
      data => {
        this.myReply = data;
        this.myReply.content = '';
        this.ngOnInit();
      },
      err => {
        console.error('Inbox Component: Unable to reply()');
      },
      () => {
        this.myReply = new DirectMessage();
      }
    );
  }

  compose(form: NgForm) {
    this.users.forEach(userProfile => {
      if (userProfile.user.username === form.value.friendUsername) {
        this.fid = userProfile.id;
      }
    });
    this.dmSvc.createDirectMessage(this.myReply, this.fid).subscribe(
      data => {
        this.loadFriendList();
        this.myReply = new DirectMessage();
      },
      err => {
        console.error('Inbox Component: Unable to reply()');
      }
    );
  }

  ngOnInit() {
    this.loadUsers();
    this.loadFriendList();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch (err) {}
  }

  loadUsers() {
    this.upSvc.index().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.error('Inbox Component: Unable to load users');
      }
    );
  }

  loadFriendList() {
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
        console.log(data);
        this.friends = [];
        this.friendsMap = new Map<number, UserProfile>();
        this.messages.forEach(message => {
          if (!this.friendsMap.has(message.friendProfile.id)) {
            // message.friendProfile.sorted = message.friendProfile.getAllMessages();
            if (message.friendProfile.id !== this.me.id) {
              this.friendsMap.set(
                message.friendProfile.id,
                message.friendProfile
              );
              this.friends.push(message.friendProfile);
            }
          }
          if (!this.friendsMap.has(message.myProfile.id)) {
            // message.friendProfile.sorted = message.friendProfile.getAllMessages();
            if (message.myProfile.id !== this.me.id) {
              this.friendsMap.set(message.myProfile.id, message.myProfile);
              this.friends.push(message.myProfile);
            }
          }
        });
      },
      err => {
        console.error('Inbox Component: Unable to load messages by user');
      }
    );
  }
}
