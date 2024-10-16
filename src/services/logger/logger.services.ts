import { Request, Response } from "express";
import Logger from "../../schema/Logger";

type MessageType = "sucess" | "error" | "info";

export class LoggerService {
  /**
   *
   * @param type message type
   * @param message message be logged to the user
   */
  static async createLog(type: MessageType, message: string, user: object) {
    const newLogger = new Logger({
      type: type,
      message: message,
      user: JSON.stringify(user),
      createdAt: Date.now(),
    });
    await newLogger.save();
  }
  static async getAllLogs(req: Request, res: Response) {
    try {
      const logs = await Logger.find({});
      if (logs.length > 0) {
        return res.status(200).json({ logs });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}
