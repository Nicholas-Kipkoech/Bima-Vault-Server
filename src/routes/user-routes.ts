import { Request, Response, Router } from "express";
import { UserService } from "../services/users/users-services";

const userRouter = Router();

userRouter.post("/login", (req: Request, res: Response) => {
  UserService.loginUser(req.body, res);
});

export default userRouter;
