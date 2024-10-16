import { Schema, model } from "mongoose";

const loggerSchema = new Schema({
  type: String,
  message: String,
  user: Object,
  createdAt: { type: Date, default: Date.now() },
});

const Logger = model("Logger", loggerSchema);
export default Logger;
