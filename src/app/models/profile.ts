import { User } from "./User";

export interface Profile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export class ProfileClass implements Profile {
  username: string;
  displayName: string;
  image?: string | undefined;
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}
