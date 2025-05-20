import { postUserLogin, postUserSignup } from "../controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/login", postUserLogin); 
userRouter.post("/signup", postUserSignup); 

export { userRouter };