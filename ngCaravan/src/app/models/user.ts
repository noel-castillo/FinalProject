export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  enabled: true;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    role?: string,
    enabled?: true
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.enabled = enabled;
  }
}
