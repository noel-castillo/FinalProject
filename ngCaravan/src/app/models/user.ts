export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  enabled: boolean;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    role?: string,
    enabled?: boolean
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.enabled = enabled;
  }
}
