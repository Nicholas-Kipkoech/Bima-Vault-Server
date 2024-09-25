import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { IUser } from "../interfaces/users";

config();

export class JWTService {
  private jwt_secret: string;
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret is not defined in enviroment variables!");
    }
    this.jwt_secret = process.env.JWT_SECRET as string;
  }
  createToken = (user: IUser) => {
    const token = jwt.sign(user, this.jwt_secret, {
      expiresIn: "5h",
    });
    return token;
  };
}
