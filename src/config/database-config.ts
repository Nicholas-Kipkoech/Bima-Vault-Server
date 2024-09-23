import mongoose from "mongoose";

export class MongodbConnection {
  static async connect(dbUrl: string) {
    try {
      await mongoose.connect(dbUrl);
      console.info("connected to the database");
    } catch (error) {
      console.error("error connecting to the mongoose database", error);
    }
  }
}
