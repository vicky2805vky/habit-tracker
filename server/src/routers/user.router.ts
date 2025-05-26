import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";
import { authoriseUser } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.use(authoriseUser);

userRouter.get("/profile", getUserProfile);
userRouter.patch("/profile", updateUserProfile);

export default userRouter;
