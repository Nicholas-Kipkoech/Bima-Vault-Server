import { Schema, model } from "mongoose";
import { IUser } from "../../interfaces/users";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date },
  roles: { type: [String], default: ["normal user"] },
  avatar: String,
});

const User = model<IUser>("User", userSchema);
export default User;
