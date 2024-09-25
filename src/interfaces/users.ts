type Roles = "Superadmin" | "claims manager" | "claims office" | "normal user";

export interface IUser {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  active: boolean;
  roles: Roles[];
  avatar?: string;
  createdAt?: Date;
  deletedAt?: Date;
}
