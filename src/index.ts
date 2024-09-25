import express, { Request, Response } from "express";
import { MongodbConnection } from "./config/database-config";

import { config } from "dotenv";
config();
const app = express();

const port = process.env.PORT || 8080;

//connect to the database
MongodbConnection.connect(process.env.DATABASE_URL as string);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Bima Vault API is running successfully" });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
