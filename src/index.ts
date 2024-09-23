import express, { Request, Response } from "express";

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Bima Vault API is running successfully");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
