type Roles = "Superadmin" | "claims manager" | "claims office" | "normal user";

export interface IUser {
  username: string;
  password: string;
}
