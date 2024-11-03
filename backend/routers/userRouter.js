import express from "express";
import { getInfo, getUserId, logIn, signUp } from "../controllers/userController.js";

const userRouter=express.Router()

userRouter.post("/login",logIn)
userRouter.post("/signUp",signUp)
userRouter.get("/userId",getUserId)
userRouter.post("/info",getInfo)

export default userRouter