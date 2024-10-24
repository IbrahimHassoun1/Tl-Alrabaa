import express from "express";
import { logIn, signUp } from "../controllers/userController.js";

const userRouter=express.Router()

userRouter.post("/login",logIn)
userRouter.post("/signUp",signUp)

export default userRouter