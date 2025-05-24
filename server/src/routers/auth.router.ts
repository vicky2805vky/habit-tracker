import express from "express";
import {
  signInUser,
  signOutUser,
  signUpUser,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/signin", signInUser);
authRouter.post("/signout", signOutUser);

export default authRouter;
