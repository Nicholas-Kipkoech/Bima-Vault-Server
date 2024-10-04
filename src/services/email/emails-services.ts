import nodemailer from "nodemailer";
import { IUser } from "../../interfaces/users";
import { config } from "dotenv";

config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.EMAIL_PASS as string,
  },
});

export class EmailService {
  constructor() {}

  static async sendEmail(subject: string, user: Partial<IUser>) {
    try {
      const info = transport.sendMail({
        from: process.env.EMAIL as string,
        subject,
        to: user?.email,
      });
      console.log("from email", info);
    } catch (error) {
      console.error(error);
    }
  }
}
