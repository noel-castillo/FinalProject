import { UserProfile } from './user-profile';
export class DirectMessage {
  id: number;
  myProfile: UserProfile;
  friendProfile: UserProfile;
  content: string;
  datePosted: Date;

  // tslint:disable-next-line: max-line-length
  constructor(
    id?: number,
    myProfile?: UserProfile,
    friendProfile?: UserProfile,
    content?: string,
    datePosted?: Date
  ) {
    this.id = id;
    this.myProfile = myProfile;
    this.friendProfile = friendProfile;
    this.content = content;
    this.datePosted = datePosted;
  }
}
