import { Response } from "express";
import { IUser } from "../../interfaces/users";
import User from "../../databases/users/users";
import { PasswordService } from "../../utils/pass-hash";

export class UserService {
  constructor() {}

  static async createUser(req: IUser, res: Response) {
    try {
      const { name, email, password, avatar, roles } = req;
      const hashedPassword = PasswordService.encrypt(password);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
        roles,
      });
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.error("error creating the user", error);
      return res.status(500).json(error);
    }
  }
}
