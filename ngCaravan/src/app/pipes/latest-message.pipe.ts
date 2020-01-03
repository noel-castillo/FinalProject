import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';
import { DirectMessage } from './../models/direct-message';
import { UserProfile } from './../models/user-profile';

@Pipe({
  name: 'latestMessage'
})
export class LatestMessagePipe implements PipeTransform {

  transform(messages: DirectMessage[], myFriend: UserProfile, me: User): DirectMessage[] {
    const results = [];
    console.log(myFriend);
    messages.forEach((message) => {
        if ((message.friendProfile.id === myFriend.id
          && message.myProfile.user.id === me.id) || (message.friendProfile.id === me.id
            && message.myProfile.user.id === myFriend.id)) {
          results.push(message);
        }
    });

    const sortedResults = [];
    sortedResults.push(results[results.length - 1]);
    return sortedResults;
  }

}
