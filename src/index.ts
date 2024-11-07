import express, { Request, Response } from "express";
import { config } from "dotenv";
import userRouter from "./routes/user-routes";
import { MongodbConnection } from "./config/database-config";
import cors from "cors";
config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

//connect to the database
MongodbConnection.connect(process.env.DATABASE_URL as string);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Bima Vault API is running successfully" });
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
