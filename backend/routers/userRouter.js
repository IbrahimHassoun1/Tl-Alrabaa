import express from "express";
import { getUserId, logIn, signUp } from "../controllers/userController.js";

const userRouter=express.Router()

userRouter.post("/login",logIn)
userRouter.post("/signUp",signUp)
userRouter.get("/userId",getUserId)

export default userRouter