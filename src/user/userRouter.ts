import express from "express"
import { createUsers, loginUser } from "./userController";
const userRouter=express.Router();

//routes
userRouter.post("/register", createUsers)
userRouter.post("/login",loginUser)
export default userRouter