import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { IUser } from "../interfaces/users";

config();

const jwt_secret = process.env.JWT_SECRET as string;

const createToken = (user: IUser) => {
  const token = jwt.sign(user, jwt_secret, {
    expiresIn: "5h",
  });
  return token;
};

export default createToken;
