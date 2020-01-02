import { DirectMessage } from './../models/direct-message';
import { UserProfile } from './../models/user-profile';
import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Pipe({
  name: 'friendMessages'
})
export class FriendMessagesPipe implements PipeTransform {

  transform(messages: DirectMessage[], myFriend: UserProfile, me: User): DirectMessage[] {
    const results = [];
    console.log(myFriend);
    messages.forEach((message) => {
        if (message.friendProfile.id === myFriend.id
          && message.myProfile.user.id === me.id) {
          results.push(message);
        }

        if (message.friendProfile.id === me.id
          && message.myProfile.user.id === myFriend.id) {
          results.push(message);
        }
    });

    return results;
  }

}
