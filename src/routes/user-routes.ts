import { Request, Response, Router } from "express";
import { UserService } from "../services/users/users-services";
import { LoggerService } from "../services/logger/logger.services";

const userRouter = Router();

userRouter.post("/login", (req: Request, res: Response) => {
  UserService.loginUser(req.body, res);
});
userRouter.get("/logs", (req: Request, res: Response) => {
  LoggerService.getAllLogs(req, res);
});
export default userRouter;
